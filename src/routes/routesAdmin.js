const routes = require("express").Router();
const {
  isAuthenticated,
  isAuthenticatedAdmin
} = require("../app/middlewares/auth");
const dashboard = require("../api/admin/dashboard");
const downloads = require("../api/admin/downloads");
const depositions = require("../api/admin/depositions");
const events = require("../api/admin/Events");

routes.get("/eventtypes", events.getTypes);
routes.get("/eventstatus", events.getStatus);

// Autorizados por autenticação

routes.get("/dashboard", isAuthenticated, dashboard.get);

routes.get("/depositions_all", isAuthenticatedAdmin, depositions.getAll);
routes.get("/depositions", isAuthenticated, depositions.get);
routes.post("/depositions", isAuthenticatedAdmin, depositions.save);
routes.put("/depositions/:id", isAuthenticatedAdmin, depositions.update);
routes.delete("/depositions/:id", isAuthenticatedAdmin, depositions.delete);

routes.get("/downloads/:file(*)", isAuthenticated, downloads.getFile);
routes.get("/downloads", isAuthenticated, downloads.get);

routes.get("/downloads_all", isAuthenticatedAdmin, downloads.getAll);
routes.post("/downloads", isAuthenticatedAdmin, downloads.save);
routes.put("/downloads/:id", isAuthenticatedAdmin, downloads.update);
routes.delete("/downloads/:id", isAuthenticatedAdmin, downloads.delete);

routes.get("/events", isAuthenticatedAdmin, events.get);
routes.post("/events", isAuthenticatedAdmin, events.save);
routes.put("/events/:id", isAuthenticatedAdmin, events.update);
routes.delete("/events/:id", isAuthenticatedAdmin, events.delete);

module.exports = routes;
