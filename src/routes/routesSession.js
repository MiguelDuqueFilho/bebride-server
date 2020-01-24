const routes = require("express").Router();

const SessionController = require("../api/controllers/sessionControler");

routes.post("/login", SessionController.login);


module.exports = routes;
