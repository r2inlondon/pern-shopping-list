const request = require("supertest");
const { app } = require("../../src/routes/routes");

describe("Combining tests", () => {
  const comboUserEmail = "zapata@hotmail.com";
  let comboUserObj;
  let comboListObj;

  it("ComboTest get user Create new user", async () => {
    await request(app)
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
    await request(app)
      .post("/lists/new")
      .send({
        userId: comboUserObj.id,
        name: "gigante",
      })
      .then((res) => {
        comboListObj = res.body;
        expect(res.body.name).toBe("Gigante");
      });
  });

  it("Get all list", async () => {
    await request(app)
      .get("/lists")
      .send({
        userId: comboUserObj.id,
      })
      .then((res) => {
        expect(res.body.length).toBe(1);
      });
  });

  it("Delete List", async () => {
    await request(app)
      .delete("/lists")
      .send({
        id: comboListObj.id,
      })
      .then((res) => expect(res.body.name).toBe("Gigante"));
  });

  it("Delete Emiliano", async () => {
    await request(app)
      .delete("/user")
      .send({
        email: comboUserObj.email,
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});
