module.exports = app => {
  app.use("*", app.src.app.controllers.middlewares.timescan);

  app.route("/signin").post(app.src.app.controllers.sessionController.signin);
  app.route("/users").get(app.src.api.user.get);
  app.route("/users").post(app.src.api.user.save);

  app.use("*", app.src.app.controllers.middlewares.authuser);
  app.route("/dashboard").get(app.src.api.dashboard.get);
};
