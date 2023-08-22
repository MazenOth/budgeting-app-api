const app = require("../app");
const request = require("supertest");
const { Category } = require("../models/category");

const categoryData = {
  userId: "64e51636d4510fb004a3638d",
  name: "testcategory",
  group: "Required Expense",
  type: "Expense",
};

beforeAll(async () => {
  await Category.deleteOne({ name: categoryData.name }).where({
    userId: categoryData.userId,
  });
});

describe("addCategory", () => {
  it("returns status code 200 if valid userId, name, group and type passed", async () => {
    const res = await request(app).post("/addCategory").send(categoryData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  it("returns status code 400 if not valid userId passed", async () => {
    const res = await request(app).post("/addCategory").send({
      userId: "64e51636d4510fb005a3638d",
      name: categoryData.name,
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid name passed", async () => {
    const res = await request(app).post("/addCategory").send({
      userId: categoryData.userId,
      name: "",
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid group passed", async () => {
    const res = await request(app).post("/addCategory").send({
      userId: categoryData.userId,
      name: categoryData.name,
      group: "",
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if not valid type passed", async () => {
    const res = await request(app).post("/addCategory").send({
      userId: categoryData.userId,
      name: categoryData.name,
      group: categoryData.group,
      type: "",
    });

    expect(res.statusCode).toBe(400);
  });

  it("returns status code 400 if repeated name passed", async () => {
    const res = await request(app).post("/addCategory").send({
      userId: categoryData.userId,
      name: categoryData.name,
      group: categoryData.group,
      type: categoryData.type,
    });

    expect(res.statusCode).toBe(400);
  });
});
