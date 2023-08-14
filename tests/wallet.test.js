const app = require("../app");
const request = require("supertest");
const { Wallet } = require("../models/wallet");

const walletData = {
  userId: "64da97335d88662d7a9fc7c0",
  name: "testwallet",
  currency: "EGP",
};

beforeAll(async () => {
  await Wallet.findOneAndDelete({ name: walletData.name }).where({
    userId: walletData.userId,
  });
  await Wallet.findOneAndDelete({ name: "testwallet2" }).where({
    userId: walletData.userId,
  });
});

describe("addWallet", () => {
  it("returns status code 200 if valid userId, name, currency passed", async () => {
    const res = await request(app).post("/addWallet").send(walletData);

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

