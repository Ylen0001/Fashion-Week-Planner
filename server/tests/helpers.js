import request from "supertest";

export function signupUser(app, { username, email, password }) {
  return request(app)
    .post("/auth/signup")
    .send({ username, email, password });
}

export function loginUser(app, { email, password }) {
  return request(app)
    .post("/auth/login")
    .send({ email, password });
}

export function authRequest(app, method, url, token) {
  return request(app)[method.toLowerCase()](url).set(
    "Authorization",
    `Bearer ${token}`
  );
}
