const app = require("../app");
const request = require("supertest");
const { Transaction } = require("../models/transaction");

let transactionId;

const transactionData = {
  walletId: "64e86a4c0e28a5db5f4a8f29",
  categoryId: "64e86a740e28a5db5f4a8f32",
  amount: 100,
};

describe("addTransaction", () => {
  it("returns status code 200 and transaction object if valid walletId, categoryId and amount passed", async () => {
    const res = await request(app)
      .post("/addTransaction")
      .send(transactionData);

    transactionId = res.body._id;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if unvalid walletId passed", async () => {
    const res = await request(app).post("/addTransaction").send({
      walletId: "",
      categoryId: transactionData.categoryId,
      amount: transactionData.amount,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if unvalid categoryId passed", async () => {
    const res = await request(app).post("/addTransaction").send({
      walletId: transactionData.categoryId,
      categoryId: "",
      amount: transactionData.amount,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if unvalid amount passed", async () => {
    const res = await request(app).post("/addTransaction").send({
      walletId: transactionData.categoryId,
      categoryId: transactionData.categoryId,
      amount: 0,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if unvalid amount passed", async () => {
    const res = await request(app).post("/addTransaction").send({
      walletId: "64c38615e14527272260b54e",
      categoryId: transactionData.categoryId,
      amount: transactionData.amount,
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("editTransaction", () => {
  it("returns status code 200 and transaction object if valid walletId, categoryId and amount passed", async () => {
    const res = await request(app)
      .put(`/editTransaction/${transactionId}`)
      .send(transactionData);

    transactionId = res.body._id;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if unvalid walletId passed", async () => {
    const res = await request(app)
      .put(`/editTransaction/${transactionId}`)
      .send({
        walletId: "64c38615e14527272260b54e",
        categoryId: transactionData.categoryId,
        amount: transactionData.amount,
      });

    expect(res.statusCode).toBe(400);
  });
  
  it("returns status code 400 if not the same walletId passed", async () => {
    const res = await request(app)
      .put(`/editTransaction/${transactionId}`)
      .send({
        walletId: "64e65949b9b208ee782b4161",
        categoryId: transactionData.categoryId,
        amount: transactionData.amount,
      });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid categoryId passed", async () => {
    const res = await request(app)
      .put(`/editTransaction/${transactionId}`)
      .send({
        walletId: transactionData.walletId,
        categoryId: "64e86a745e28a5db5f4a8f34",
        amount: transactionData.amount,
      });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid amount passed", async () => {
    const res = await request(app)
      .put(`/editTransaction/${transactionId}`)
      .send({
        walletId: transactionData.walletId,
        categoryId: transactionData.categoryId,
        amount: -100,
      });

    expect(res.statusCode).toBe(400);
  });
});

describe("deleteTransaction", () => {
  it("returns status code 200 if existing transaction id passed", async () => {
    const res = await request(app).delete(`/deleteTransaction/${transactionId}`);

    expect(res.statusCode).toBe(200);
  });

  it("returns status code 400 if not existing transaction id passed", async () => {
    const res = await request(app).delete(`/deleteTransaction/${transactionId}`);

    expect(res.statusCode).toBe(400);
  });
});


