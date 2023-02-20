const request = require("supertest");
const { app } = require("../../src/routes/routes");

describe("Combining tests", () => {
  const comboUserEmail = "zapata@hotmail.com";
  let auhtTokens;
  let listObj;
  let productObj;
  let shoppingObj;

  it("ComboTest Create new user", async () => {
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

  // it("ComboTest get user", async () => {
  //   await request(app)
  //     .get("/user")
  //     .send({
  //       email: comboUserEmail,
  //     })
  //     .then((res) => {
  //       auhtTokens = res.body;
  //       expect(res.body.email).toBe("zapata@hotmail.com");
  //     });
  // });

  // it("ComboTest create List", async () => {
  //   await request(app)
  //     .post("/lists/new")
  //     .send({
  //       userId: auhtTokens.id,
  //       name: "gigante",
  //     })
  //     .then((res) => {
  //       listObj = res.body;
  //       expect(res.body.name).toBe("Gigante");
  //     });
  // });

  // it("Get all list", async () => {
  //   await request(app)
  //     .get("/lists")
  //     .send({
  //       userId: auhtTokens.id,
  //     })
  //     .then((res) => {
  //       expect(res.body.length).toBe(1);
  //     });
  // });

  // it("create new item and insert to List", async () => {
  //   await request(app)
  //     .post("/products/new/inlist")
  //     .send({
  //       listId: listObj.id,
  //       productName: "beer",
  //     })
  //     .then((res) => {
  //       productObj = res.body;
  //       expect(res.body.name).toBe("Beer");
  //     });
  // });

  // it("Get products in list", async () => {
  //   await request(app)
  //     .get("/shopping")
  //     .send({
  //       listId: listObj.id,
  //     })
  //     .then((res) => {
  //       shoppingObj = res.body[0];
  //       expect(res.body.length).toBe(1);
  //     });
  // });

  // it("Mark product in list as completed", async () => {
  //   await request(app)
  //     .put("/shopping")
  //     .send({
  //       id: shoppingObj.id,
  //       completed: true,
  //     })
  //     .then((res) => {
  //       expect(res.body.completed).toBe(true);
  //     });
  // });

  // // Test delete all data
  // it("Delete item in Shopping", async () => {
  //   await request(app)
  //     .delete("/shopping")
  //     .send({
  //       shoppingId: shoppingObj.id,
  //     })
  //     .then((res) => {
  //       expect(res.body.id).toBe(shoppingObj.id);
  //     });
  // });

  // it("Delete product", async () => {
  //   await request(app)
  //     .delete("/products/name")
  //     .send({
  //       name: "Beer",
  //     })
  //     .then((res) => {
  //       expect(res.body.name).toBe("Beer");
  //     });
  // });

  // it("Delete List", async () => {
  //   await request(app)
  //     .delete("/lists")
  //     .send({
  //       id: listObj.id,
  //     })
  //     .then((res) => expect(res.body.name).toBe("Gigante"));
  // });

  // it("Delete Emiliano", async () => {
  //   await request(app)
  //     .delete("/user")
  //     .send({
  //       email: auhtTokens.email,
  //     })
  //     .then((res) => {
  //       expect(res.statusCode).toBe(201);
  //     });
  // });
});
