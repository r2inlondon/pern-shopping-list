const request = require("supertest");
const { app } = require("../../src/routes/routes");

describe("lists Routes", () => {
  it("Get all list", async () => {
    const results = await request(app)
      .get("/lists")
      .send({
        userId: "cc9ff2e2-c3fb-4215-8ee3-21de7d011305",
      })
      .then((res) => {
        expect(res.body.length).toBe(2);
      });
  });
});
