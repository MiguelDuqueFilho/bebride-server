const routes = require("express").Router();
const { isAuthenticated } = require("../app/middlewares/auth");
const SessionController = require("../api/controllers/sessionControler");

routes.get("/healthcheck", SessionController.healthcheck);
routes.post("/validate_token", SessionController.validateToken);
routes.post("/login", SessionController.login);
routes.post("/signup", SessionController.signup);
routes.post("/sendemail", SessionController.sendEmail);
routes.post("/forgot_password", SessionController.forgotPassword);
routes.post("/reset_password", SessionController.resetPassword);

routes.get("/logoff", isAuthenticated, SessionController.logoff);
routes.post(
  "/change_password",
  isAuthenticated,
  SessionController.changePassword
);

module.exports = routes;
