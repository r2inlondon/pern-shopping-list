const request = require("supertest");
const { app } = require("../../src/routes/routes");

describe("Combining tests", () => {
  let authTokens;
  let listObj;
  let productObj;
  let shoppingObj;

  it("Create new user", async () => {
    await request(app)
      .post("/auth/register")
      .send({
        firstName: "Emiliano",
        lastName: "Zapata",
        email: "zaPata@HOTMAIL.com",
        password: "Jazz123*91",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it("User Login", async () => {
    await request(app)
      .post("/auth")
      .send({
        email: "zaPata@HOTMAIL.com",
        password: "Jazz123*91",
      })
      .then((res) => {
        authTokens = res.body;
        expect(res.statusCode).toBe(200);
      });
  });

  it("ComboTest create List", async () => {
    await request(app)
      .post("/lists/new")
      .send({
        userId: authTokens.id,
        name: "soriana",
      })
      .set("Authorization", `Bearer ${authTokens.accessToken}`)
      .then((res) => {
        listObj = res.body;
        expect(res.body.name).toBe("Soriana");
      });
  });

  it("Get all list", async () => {
    await request(app)
      .get("/lists")
      .set("Authorization", `Bearer ${authTokens.accessToken}`)
      .then((res) => {
        expect(res.body.length).toBe(1);
      });
  });

  it("Add item to List", async () => {
    await request(app)
      .post("/shopping/new")
      .send({
        listId: listObj.id,
        name: "beer",
      })
      .set("Authorization", `Bearer ${authTokens.accessToken}`)
      .then((res) => {
        productObj = res.body;
        expect(res.statusCode).toBe(200);
      });
  });

  it("Get products in list", async () => {
    await request(app)
      .get(`/shopping/${listObj.id}`)
      .set("Authorization", `Bearer ${authTokens.accessToken}`)
      .then((res) => {
        shoppingObj = res.body[0];
        expect(res.body.length).toBe(1);
      });
  });

  it("Mark product in list as completed", async () => {
    await request(app)
      .put("/shopping")
      .send({
        id: shoppingObj.id,
        completed: true,
      })
      .set("Authorization", `Bearer ${authTokens.accessToken}`)
      .then((res) => {
        expect(res.body.completed).toBe(true);
      });
  });

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

  it("Delete Emiliano", async () => {
    await request(app)
      .delete("/auth/delete")
      .send({
        email: "zapata@hotmail.com",
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});
