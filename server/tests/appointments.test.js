import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { authRequest, signupUser } from "./helpers.js";

const app = createApp();

async function createAuthedUser(label) {
  const res = await signupUser(app, {
    username: label,
    email: `${label}@test.com`,
    password: "secret123",
  });

  return {
    token: res.body.token,
    userId: res.body.user.id,
  };
}

const sampleAppointment = {
  brandName: "Dior",
  appointmentDate: "2026-09-15T14:00",
  location: "Paris",
  notes: "Bring portfolio",
};

describe("Appointments API", () => {
  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns 401 without a token", async () => {
    const res = await request(app).get("/appointments");

    expect(res.status).toBe(401);
  });

  it("creates and lists appointments for the authenticated user", async () => {
    const { token } = await createAuthedUser("alice");

    const createRes = await authRequest(app, "post", "/appointments", token)
      .send(sampleAppointment);

    expect(createRes.status).toBe(200);
    expect(createRes.body.brandName).toBe("Dior");

    const listRes = await authRequest(app, "get", "/appointments", token);

    expect(listRes.status).toBe(200);
    expect(listRes.body).toHaveLength(1);
    expect(listRes.body[0].brandName).toBe("Dior");
  });

  it("does not expose another user's appointments", async () => {
    const alice = await createAuthedUser("alice");
    const bob = await createAuthedUser("bob");

    await authRequest(app, "post", "/appointments", alice.token).send(
      sampleAppointment
    );

    const bobList = await authRequest(app, "get", "/appointments", bob.token);

    expect(bobList.body).toHaveLength(0);
  });

  it("updates only the owner's appointment", async () => {
    const alice = await createAuthedUser("alice");
    const bob = await createAuthedUser("bob");

    const created = await authRequest(app, "post", "/appointments", alice.token)
      .send(sampleAppointment);

    const ownUpdate = await authRequest(
      app,
      "put",
      `/appointments/${created.body.id}`,
      alice.token
    ).send({
      ...sampleAppointment,
      brandName: "Chanel",
    });

    expect(ownUpdate.status).toBe(200);
    expect(ownUpdate.body.brandName).toBe("Chanel");

    const otherUpdate = await authRequest(
      app,
      "put",
      `/appointments/${created.body.id}`,
      bob.token
    ).send({
      ...sampleAppointment,
      brandName: "Stolen",
    });

    expect(otherUpdate.status).toBe(404);
  });

  it("deletes only the owner's appointment", async () => {
    const alice = await createAuthedUser("alice");
    const bob = await createAuthedUser("bob");

    const created = await authRequest(app, "post", "/appointments", alice.token)
      .send(sampleAppointment);

    const otherDelete = await authRequest(
      app,
      "delete",
      `/appointments/${created.body.id}`,
      bob.token
    );

    expect(otherDelete.status).toBe(404);

    const ownDelete = await authRequest(
      app,
      "delete",
      `/appointments/${created.body.id}`,
      alice.token
    );

    expect(ownDelete.status).toBe(200);

    const listRes = await authRequest(app, "get", "/appointments", alice.token);
    expect(listRes.body).toHaveLength(0);
  });
});
