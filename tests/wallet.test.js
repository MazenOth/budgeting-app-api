const app = require("../app");
const request = require("supertest");
const { Wallet } = require("../models/wallet");
const { Category } = require("../models/category");

const walletData = {
  userId: "64e517f612c25e3d292c3a29",
  name: "testwallet",
  currency: "EGP",
};

let newWallet = "Wakanda";

let walletId;

afterAll(async () => {
  await Category.deleteMany({ walletId: walletId });
});

describe("addWallet", () => {
  it("returns status code 200 if valid userId, name, currency passed", async () => {
    const res = await request(app).post("/addWallet").send(walletData);

    walletId = res.body._id;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if not valid userId passed", async () => {
    const res = await request(app).post("/addWallet").send({
      userId: "64da97335d88662d7a9fc7c",
      name: "testwallet",
      currency: "EGP",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid name passed", async () => {
    const res = await request(app).post("/addWallet").send({
      userId: "64da97335d88662d7a9fc7c0",
      name: "",
      currency: "EGP",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid currency passed", async () => {
    const res = await request(app).post("/addWallet").send({
      userId: "64da97335d88662d7a9fc7c0",
      name: "testwallet2",
      currency: "RUB",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not existing userId passed", async () => {
    const res = await request(app).post("/addWallet").send({
      userId: "64da97335d88662d7a6fc7c0",
      name: "testwallet2",
      currency: "EGP",
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("editWallet", () => {
  it("returns status code 200 if valid userId, name, currency passed", async () => {
    const res = await request(app).put(`/editWallet/${walletId}`).send({
      userId: walletData.userId,
      name: newWallet,
      currency: "EGP",
      balance: 0,
    });

    expect(res.statusCode).toBe(200);
  });

  it("returns status code 400 if valid existing wallet name passed", async () => {
    const res = await request(app).put(`/editWallet/${walletId}`).send({
      userId: "64ba7b4d9f55f2a82f86f64b",
      name: newWallet,
      currency: "EGP",
      balance: 0,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not existing userId passed", async () => {
    const res = await request(app).put(`/editWallet/${walletId}`).send({
      userId: "64ba7b4d9f55f2a82f87f64b",
      name: "newWallet",
      currency: "EGP",
      balance: 0,
    });

    expect(res.statusCode).toBe(400);
  });

  describe("deleteWallet", () => {
    it("returns status code 200 if existing wallet id passed", async () => {
      const res = await request(app).delete(`/deleteWallet/${walletId}`);

      expect(res.statusCode).toBe(200);
    });
  });

  it("returns status code 400 if not existing wallet id passed", async () => {
    const res = await request(app).delete(`/deleteWallet/${walletId}`);

    expect(res.statusCode).toBe(400);
  });
});
