const routes = require("express").Router();
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../app/middlewares/auth");
const users = require("../api/admin/user");
const dashboard = require("../api/admin/Dashboard");
const downloads = require("../api/admin/Downloads");
const uploads = require("../api/admin/Uploads");
const depositions = require("../api/admin/Depositions");
const events = require("../api/admin/Events");
const tasks = require("../api/admin/Tasks");

routes.get("/eventtypes", events.getTypes);
routes.get("/eventstatus", events.getStatus);

// Autorizados por autenticação

routes
  .get("/users/:id", isAuthenticatedAdmin, users.getById)
  .put("/users/:id", isAuthenticatedAdmin, users.update)
  .delete("/users/:id", isAuthenticatedAdmin, users.delete);

routes.get("/users", isAuthenticatedAdmin, users.get);
routes.post("/users", isAuthenticatedAdmin, users.save);

routes.get("/dashboard", isAuthenticated, dashboard.get);

routes.get("/depositions_all", isAuthenticatedAdmin, depositions.getAll);
routes.get("/depositions", isAuthenticated, depositions.get);
routes.post("/depositions", isAuthenticatedAdmin, depositions.save);
routes.put("/depositions/:id", isAuthenticatedAdmin, depositions.update);
routes.delete("/depositions/:id", isAuthenticatedAdmin, depositions.delete);

routes.post("/uploads", isAuthenticatedAdmin, uploads.upload);

routes.get("/uploads", isAuthenticatedAdmin, uploads.get);
routes.get("/uploads/:id", isAuthenticatedAdmin, uploads.getById);
routes.get("/uploadstype/:type", isAuthenticatedAdmin, uploads.getType);
routes.put("/uploads/:id", isAuthenticatedAdmin, uploads.update);
routes.delete("/uploads/:id", isAuthenticatedAdmin, uploads.delete);

routes.get("/downloads/:file(*)", isAuthenticated, downloads.getFile);

routes.get("/downloads_all", isAuthenticatedAdmin, downloads.getAll);
routes.get("/downloads", isAuthenticated, downloads.get);
routes.post("/downloads", isAuthenticatedAdmin, downloads.save);
routes.put("/downloads/:id", isAuthenticatedAdmin, downloads.update);
routes.delete("/downloads/:id", isAuthenticatedAdmin, downloads.delete);

routes.get("/events", isAuthenticatedAdmin, events.get);
routes.post("/events", isAuthenticatedAdmin, events.save);
routes.put("/events/:id", isAuthenticatedAdmin, events.update);
routes.delete("/events/:id", isAuthenticatedAdmin, events.delete);

routes.get("/tasks", isAuthenticatedAdmin, tasks.get);
routes.post("/tasks", isAuthenticatedAdmin, tasks.save);
routes.put("/tasks/:id", isAuthenticatedAdmin, tasks.update);
routes.delete("/tasks/:id", isAuthenticatedAdmin, tasks.delete);

module.exports = routes;
