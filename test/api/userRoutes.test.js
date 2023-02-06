const request = require("supertest");
const { app } = require("../../src/routes");

describe("POST new user route", () => {
  test("Create User", async () => {
    const results = await request(app)
      .post("/user/new")
      .send({
        firstName: "Alice",
        lastName: "Red",
        email: "alice@inigo.com",
        password: "Jazz",
      })
      .expect(201)
      .expect((res) => {
        console.log(res.body);
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

describe("Get new user route", () => {
  test("Get User", async () => {
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
