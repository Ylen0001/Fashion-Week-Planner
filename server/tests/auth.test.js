import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";
import { createApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { loginUser, signupUser } from "./helpers.js";

const app = createApp();

describe("Auth API", () => {
  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("signs up a user and returns a token", async () => {
    const res = await signupUser(app, {
      username: "alice",
      email: "alice@test.com",
      password: "secret123",
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toMatchObject({
      username: "alice",
      email: "alice@test.com",
    });

    const stored = await prisma.user.findUnique({
      where: { email: "alice@test.com" },
    });
    expect(stored.password).toMatch(/^\$2[aby]\$/);
  });

  it("logs in with valid credentials", async () => {
    await signupUser(app, {
      username: "bob",
      email: "bob@test.com",
      password: "secret123",
    });

    const res = await loginUser(app, {
      email: "bob@test.com",
      password: "secret123",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("bob@test.com");
  });

  it("returns 401 for invalid credentials", async () => {
    await signupUser(app, {
      username: "carol",
      email: "carol@test.com",
      password: "secret123",
    });

    const res = await loginUser(app, {
      email: "carol@test.com",
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid credentials");
  });

  it("migrates legacy plaintext passwords on login", async () => {
    await prisma.user.create({
      data: {
        username: "legacy",
        email: "legacy@test.com",
        password: "plain-secret",
      },
    });

    const res = await loginUser(app, {
      email: "legacy@test.com",
      password: "plain-secret",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    const stored = await prisma.user.findUnique({
      where: { email: "legacy@test.com" },
    });
    expect(stored.password).toMatch(/^\$2[aby]\$/);
    expect(await bcrypt.compare("plain-secret", stored.password)).toBe(true);
  });

  it("returns the current user from GET /auth/me", async () => {
    const signup = await signupUser(app, {
      username: "dave",
      email: "dave@test.com",
      password: "secret123",
    });

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${signup.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      username: "dave",
      email: "dave@test.com",
    });
  });

  it("returns 401 for GET /auth/me without a token", async () => {
    const res = await request(app).get("/auth/me");

    expect(res.status).toBe(401);
  });
});
