const app = require("../app");
const request = require("supertest");
const { Category } = require("../models/category");

let categoryId;
let newCategoryName = "newtestcategory";

const categoryData = {
  walletId: "64e65949b9b208ee782b4161",
  name: "testcategory",
  group: "Required Expense",
  type: "Expense",
};

describe("addCategory", () => {
  it("returns status code 200 if valid walletId, name, group and type passed", async () => {
    const res = await request(app).post("/addCategory").send(categoryData);

    categoryId = res.body._id;

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if not valid walletId passed", async () => {
    const res = await request(app).post("/addCategory").send({
      walletId: "64e51636d4510fb005a3638d",
      name: categoryData.name,
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid name passed", async () => {
    const res = await request(app).post("/addCategory").send({
      walletId: categoryData.walletId,
      name: "",
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid group passed", async () => {
    const res = await request(app).post("/addCategory").send({
      walletId: categoryData.walletId,
      name: categoryData.name,
      group: "",
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid type passed", async () => {
    const res = await request(app).post("/addCategory").send({
      walletId: categoryData.walletId,
      name: categoryData.name,
      group: categoryData.group,
      type: "",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if repeated name passed", async () => {
    const res = await request(app).post("/addCategory").send({
      walletId: categoryData.walletId,
      name: categoryData.name,
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("editCategory", () => {
  it("returns status code 200 if valid categoryId, walletId, name, group and type passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: categoryData.walletId,
      name: newCategoryName,
      group: "Required Expense",
      type: "Expense",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if not valid walletId passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: "64e51636d4510fb005a3638d",
      name: newCategoryName,
      group: "Required Expense",
      type: "Expense",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if repeated name passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: categoryData.walletId,
      name: newCategoryName,
      group: "Required Expense",
      type: "Expense",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid name passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: categoryData.walletId,
      name: "",
      group: "Required Expense",
      type: "Expense",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid group passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: categoryData.walletId,
      name: newCategoryName,
      group: "",
      type: "Expense",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid type passed", async () => {
    const res = await request(app).put(`/editCategory/${categoryId}`).send({
      walletId: categoryData.walletId,
      name: newCategoryName,
      group: "Required Expense",
      type: "",
    });

    expect(res.statusCode).toBe(400);
  });
});

describe("deleteCategory", () => {
  it("returns status code 200 if existing category id passed", async () => {
    const res = await request(app).delete(`/deleteCategory/${categoryId}`);

    expect(res.statusCode).toBe(200);
  });

  it("returns status code 400 if not existing category id passed", async () => {
    const res = await request(app).delete(`/deleteCategory/${categoryId}`);

    expect(res.statusCode).toBe(400);
  });
});
