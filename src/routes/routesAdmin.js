const routes = require("express").Router();
const isAuthenticated = require("../app/middlewares/auth");
const dashboard = require("../api/admin/dashboard");
const events = require("../api/admin/Events");

// routes.get("/dashboard", isAuthenticated, dashboard.get);
routes.get("/dashboard", dashboard.get);
routes.get("/events", events.get);
routes.get("/eventtypes", events.getTypes);
routes.get("/eventstatus", events.getStatus);
routes.post("/events", events.save);
routes.put("/events/:id", events.update);
routes.delete("/events/:id", events.delete);

module.exports = routes;
