const request = require("supertest");
const { app } = require("../../src/routes/routes");

describe("Combining tests", () => {
  const comboUserEmail = "zapata@hotmail.com";
  let comboUserObj;
  let comboListObj;

  it("ComboTest get user Create new user", async () => {
    const results = await request(app)
      .post("/user/new")
      .send({
        firstName: "Emiliano",
        lastName: "Zapata",
        email: comboUserEmail,
        password: "Jazz123*91",
      })
      .expect(201);
  });

  it("ComboTest get user", async () => {
    await request(app)
      .get("/user")
      .send({
        email: comboUserEmail,
      })
      .then((res) => {
        comboUserObj = res.body;
        expect(res.body.email).toBe("zapata@hotmail.com");
      });
  });

  it("ComboTest create List", async () => {
    comboListObj = await request(app)
      .post("/lists/new")
      .send({
        userId: comboUserObj.id,
        name: "gigante",
      })
      .then((res) => {
        expect(res.body.name).toBe("Gigante");
      });
  });
});
