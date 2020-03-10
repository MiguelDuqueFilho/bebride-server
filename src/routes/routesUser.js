const routes = require("express").Router();
const { isAuthenticatedAdmin } = require("../app/middlewares/auth");
const users = require("../api/admin/user");

// routes
//   .get("/users/:id", isAuthenticated, users.getById)
//   .put("/users/:id", isAuthenticated, users.update)
//   .delete("/users/:id", isAuthenticated, users.delete);

routes
  .get("/users/:id", isAuthenticatedAdmin, users.getById)
  .put("/users/:id", isAuthenticatedAdmin, users.update)
  .delete("/users/:id", isAuthenticatedAdmin, users.delete);

routes.get("/users", isAuthenticatedAdmin, users.get);
routes.post("/users", isAuthenticatedAdmin, users.save);

module.exports = routes;
