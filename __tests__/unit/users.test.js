const faker = require("faker");
const request = require("supertest");
const app = require("../../src/app.js");
const factory = require("../factories");
const bcrypt = require("bcryptjs");

describe("Users consult", () => {
  it("should check user without user name", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        userName: "",
        userEmail: faker.internet.email()
      });
    expect(response.status).toBe(400);
  });

  it("should check user without user Email", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        userName: faker.name.findName(),
        userEmail: ""
      });
    expect(response.status).toBe(400);
  });

  it("should check password not confirmed ", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        userName: faker.name.findName(),
        userEmail: faker.internet.email(),
        password: "123456",
        confirmPassword: "654321"
      });
    expect(response.status).toBe(400);
  });

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
    expect(response.status).toBe(204);
  });

  it("should updated user ", async () => {
    const user = await factory.create("User", {
      userEmail: "userupdt@gmail.com",
      password: "123456"
    });

    const password = faker.internet.password();
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        userName: "Usuário Atualizado",
        userEmail: faker.internet.email(),
        password: password,
        confirmPassword: password
      });
    expect(response.status).toBe(204);
  });

  it("should deleted user ", async () => {});

  it("shoud check success hash in password", async () => {
    const user = await factory.create("User", {
      userEmail: "user1@gmail.com",
      password: "123456"
    });
    expect(await bcrypt.compare("123456", user.passwordHash)).toBe(true);
  });

  it("shoud check error hash in password", async () => {
    const user = await factory.create("User", {
      password: "654321"
    });
    expect(await bcrypt.compare("123456", user.passwordHash)).toBe(false);
  });

  it("should list users ", async () => {
    const response = await request(app)
      .get("/users")
      .send();

    expect(response.status).toBe(200);
  });

  it("should list user by id", async () => {
    const response = await request(app)
      .get("/users/1")
      .send();

    expect(response.status).toBe(200);
  });
});
