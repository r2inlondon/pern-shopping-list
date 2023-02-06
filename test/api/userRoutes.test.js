const request = require("supertest");
const { app } = require("../../src/routes");

describe("POST new user route", () => {
  test("Create new user name Alice", async () => {
    const results = await request(app)
      .post("/user/new")
      .send({
        firstName: "Alice",
        lastName: "Red",
        email: "alice@inigo.com",
        password: "Jazz123*91",
      })
      .expect(201)
      .expect((res) => {
        res.text = "User Created";
      });
  });

  test("Create User already registered email", async () => {
    const results = await request(app)
      .post("/user/new")
      .send({
        firstName: "Pepe",
        lastName: "Frog",
        email: "alice@inigo.com",
        password: "RockAndRoll",
      })
      .expect(400)
      .expect((res) => {
        res.text = "Bad request!";
      });
  });
});

describe("Get user ROUTE", () => {
  test("Find Alice", async () => {
    const results = await request(app)
      .get("/user")
      .send({
        email: "alice@inigo.com",
      })
      .expect(200)
      .expect((res) => {
        res.body.email = "alice@inigo.com";
      });
  });
});

describe("Delete user ROUTE", () => {
  test("Delete Alice", async () => {
    const results = await request(app).delete("/user").send({
      email: "alice@inigo.com",
    });
    expect(results.statusCode).toBe(201);
  });
});
