const request = require("supertest");
const app = require("../../src/app.js");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Autentication", () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  it("shoud created user", async () => {
    const password = "123456";
    //    const passwordHash = await bcrypt.hash(password, 8);

    const user = await factory.create("User", {
      userEmail: "modelo@gmail.com",
      password
    });
    expect(user.userEmail).toEqual("modelo@gmail.com");
  });

  it("should not authenticate with invalid password", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        userEmail: "modelo@gmail.com",
        password: "654321"
      });

    expect(response.status).toBe(401);
  });

  it("should authenticate with valid credentials", async () => {
    const response = await request(app)
      .post("/signin")
      .send({
        userEmail: "modelo@gmail.com",
        password: "123456"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123456"
    });

    const response = await request(app)
      .get("/dashboard")
      .set({ Authorization: `Bearer ${user.generateToken()}` });

    expect(response.status).toBe(200);
  });

  it("should not be able access private routes without jwt Token", async () => {
    const response = await request(app).get("/dashboard");
    expect(response.status).toBe(401);
  });

  it("should not be able access private routes with invalid jwt Token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set({ Authorization: `Bearer 123123123123` });

    expect(response.status).toBe(401);
  });
});
