const app = require("../app");
const request = require("supertest");
const { User } = require("../models/user");

const userData = {
  email: "testest@gmail.com",
  password: "123456789",
};

beforeAll(async () => {
  await User.findOneAndDelete({ email: userData.email });
});

describe("signup", () => {
  it("returns status code 200 if valid email and password passed", async () => {
    const res = await request(app).post("/signup").send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.headers["x-auth-token"]).toEqual(expect.any(String));
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if user is already exist", async () => {
    const res = await request(app).post("/signup").send(userData);

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if email isn't valid", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ email: "mazen", password: "123456789" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if password isn't valid", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ email: "mazen@gmail.com", password: "123" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if password is missing", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ email: "mazen@gmail.com" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if email is missing", async () => {
    const res = await request(app).post("/signup").send({});

    expect(res.statusCode).toBe(400);
  });
});
