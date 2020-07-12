const routes = require("express").Router();

const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../app/middlewares/auth");
const users = require("../api/admin/user");
const dashboard = require("../api/admin/dashboard");
const downloads = require("../api/admin/downloads");
const uploads = require("../api/admin/uploads");
const events = require("../api/admin/events");
const {
  deposition,
  getDepositionValidate,
  saveDepositionValidate,
  updateDepositionValidate,
  deleteDepositionValidate,
} = require("../api/admin/depositions");
const {
  task,
  getTaskValidate,
  saveTaskValidate,
  updateTaskValidate,
  deleteTaskValidate,
} = require("../api/admin/tasks");

routes.get("/eventtypes", events.getTypes);
routes.get("/eventstatus", events.getStatus);
routes.get("/depositions", deposition.get);

// Autorizados por autenticação

routes
  .get("/users/:id", isAuthenticatedAdmin, users.getById)
  .put("/users/:id", isAuthenticatedAdmin, users.update)
  .delete("/users/:id", isAuthenticatedAdmin, users.delete);

routes.get("/users", isAuthenticatedAdmin, users.get);
routes.post("/users", isAuthenticatedAdmin, users.save);

routes.get("/dashboard", isAuthenticated, dashboard.get);

routes.get(
  "/depositions_all",
  isAuthenticatedAdmin,
  getDepositionValidate,
  deposition.getAll
);

routes.post(
  "/depositions",
  isAuthenticatedAdmin,
  saveDepositionValidate,
  deposition.save
);
routes.put(
  "/depositions/:id",
  isAuthenticatedAdmin,
  updateDepositionValidate,
  deposition.update
);
routes.delete(
  "/depositions/:id",
  isAuthenticatedAdmin,
  deleteDepositionValidate,
  deposition.delete
);

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
routes.get("/events/:id", isAuthenticatedAdmin, events.getById);
routes.post("/events", isAuthenticatedAdmin, events.save);
routes.put("/events/:id", isAuthenticatedAdmin, events.update);
routes.delete("/events/:id", isAuthenticatedAdmin, events.delete);

routes.get("/tasks/sections", task.getSections);
routes.get("/tasks/status", task.getStatus);
routes.get("/tasks", isAuthenticatedAdmin, getTaskValidate, task.get);
routes.post("/tasks", isAuthenticatedAdmin, saveTaskValidate, task.save);
routes.put("/tasks/:id", isAuthenticatedAdmin, updateTaskValidate, task.update);
routes.delete(
  "/tasks/:id",
  isAuthenticatedAdmin,
  deleteTaskValidate,
  task.delete
);

module.exports = routes;
