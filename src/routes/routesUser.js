const routes = require("express").Router();
const isAuthenticated = require("../app/middlewares/auth");
const users = require("../api/admin/user");
const dashboard = require("../api/admin/dashboard");

routes.get("/dashboard", isAuthenticated, dashboard.get);

routes.get("/users/:id", users.getById);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.delete);
routes.get("/users", users.get);
routes.post("/users", users.save);

module.exports = routes;
