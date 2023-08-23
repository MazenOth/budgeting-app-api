const app = require("../app");
const request = require("supertest");
const { User } = require("../models/user");
const { Category } = require("../models/category");

const userData = {
  email: "testest@gmail.com",
  password: "123456789",
};

let userId;

beforeAll(async () => {
  await User.findOneAndDelete({ email: userData.email });
});

afterAll(async () => {
  await Category.deleteMany({ userId: userId });
});

describe("signup", () => {
  it("returns status code 200 if valid email and password passed", async () => {
    const res = await request(app).post("/signup").send(userData);

    userId = res.body._id;

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

describe("signin", () => {
  it("returns status code 200 and access token if valid email and password passed", async () => {
    const res = await request(app).post("/signin").send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.headers["x-auth-token"]).toEqual(expect.any(String));
  });

  it("returns status code 400 if email isn't valid", async () => {
    const res = await request(app)
      .post("/signin")
      .send({ email: "mazen", password: "123456789" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if password isn't valid", async () => {
    const res = await request(app)
      .post("/signin")
      .send({ email: "mazen@gmail.com", password: "123" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not existing email is passed", async () => {
    const res = await request(app)
      .post("/signin")
      .send({ email: "notexisting@gmail.com", password: "123456789" });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if wrong password for existing email is passed", async () => {
    const res = await request(app)
      .post("/signin")
      .send({ email: "testest@gmail.com", password: "12345678" });

    expect(res.statusCode).toBe(400);
  });
});
