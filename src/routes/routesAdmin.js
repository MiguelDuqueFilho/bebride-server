const routes = require("express").Router();
const {
  isAuthenticated,
  isAuthenticatedAdmin
} = require("../app/middlewares/auth");
const dashboard = require("../api/admin/dashboard");
const downloads = require("../api/admin/downloads");
const events = require("../api/admin/Events");

routes.get("/eventtypes", events.getTypes);
routes.get("/eventstatus", events.getStatus);

// Autorizados por autenticação

// routes.get("/dashboard", dashboard.get);
routes.get("/downloads/:file(*)", isAuthenticated, downloads.getFile);
routes.get("/dashboard", isAuthenticated, dashboard.get);
routes.get("/events", isAuthenticatedAdmin, events.get);
routes.post("/events", isAuthenticatedAdmin, events.save);
routes.put("/events/:id", isAuthenticatedAdmin, events.update);
routes.delete("/events/:id", isAuthenticatedAdmin, events.delete);

module.exports = routes;
