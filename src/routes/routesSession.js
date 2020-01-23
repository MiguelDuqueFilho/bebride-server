const routes = require("express").Router();

const authMiddleware = require("../app/middlewares/auth");

const SessionController = require("../api/controllers/sessionControler");

routes.post("/login", SessionController.login);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
