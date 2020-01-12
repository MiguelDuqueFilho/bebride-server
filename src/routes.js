module.exports = app => {
  app.use("*", app.src.api.middlewares.timescan);
  app.route("/users").get(app.src.api.user.get);
};
