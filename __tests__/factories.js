const faker = require("faker");
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  userName: faker.name.findName(),
  userEmail: faker.internet.email(),
  password: faker.internet.password
});

module.exports = factory;
