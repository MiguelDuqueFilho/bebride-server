module.exports = app => {
  app.use("*", app.src.app.controllers.middlewares.timescan);

  app.route("/signin").post(app.src.app.controllers.sessionController.signin);
  app.route("/users/:id").get(app.src.api.user.getById);
  app.route("/users/:id").put(app.src.api.user.save);
  app.route("/users").get(app.src.api.user.get);
  app.route("/users").post(app.src.api.user.save);

  app.use(app.src.app.controllers.middlewares.authuser);
  app.route("/admin").get(app.src.api.dashboard.get);
};
