const routes = require("express").Router();

const users = require("../api/admin/user");

routes.get("/users/:id", users.getById);
routes.put("/users/:id", users.save);
routes.get("/users", users.get);
routes.post("/users", users.save);

module.exports = routes;
