const request = require("supertest");
const app = require("../../src/app.js");

describe("Test jest", () => {
  it("should sum two numbers", () => {
    const x = 2;
    const y = 4;
    const sum = x + y;
    expect(sum).toBe(6);
  });
});
describe("Users consult", () => {
  it("List users from database", async () => {
    const response = await request(app)
      .get("/users")
      .send();

    console.log(response.error.text);
    expect(response.status).toBe(200);
  });
});
// describe("Users register", () => {
//   it("Insert user in database", () => {});
// });
