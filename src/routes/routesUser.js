const routes = require("express").Router();
const isAuthenticated = require("../app/middlewares/auth");
const users = require("../api/admin/user");
const dashboard = require("../api/admin/dashboard");

routes.get("/dashboard", isAuthenticated, dashboard.get);

routes.get("/users/:id", isAuthenticated, users.getById);
routes.put("/users/:id", isAuthenticated, users.save);
routes.get("/users", users.get);
routes.post("/users", isAuthenticated, users.save);

module.exports = routes;
