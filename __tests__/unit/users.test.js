const faker = require("faker");
const request = require("supertest");
const app = require("../../src/app.js");
const factory = require("../factories");
const bcrypt = require("bcryptjs");

describe("Users consult", () => {
  it("should created user ", async () => {
    const password = faker.internet.password();
    const response = await request(app)
      .post("/users")
      .send({
        userName: faker.name.findName(),
        userEmail: faker.internet.email(),
        password: password,
        confirmPassword: password
      });
    expect(response.status).toBe(200);
  });

  it("List users ", async () => {
    const response = await request(app)
      .get("/users")
      .send();

    expect(response.status).toBe(200);
  });

  it("shoud encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "123456"
    });
    expect(await bcrypt.compare("123456", user.passwordHash)).toBe(true);
  });
});
