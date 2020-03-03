const { authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { errorHandler } = require("../../util/respHandler");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "usuário não logado." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decode = await promisify(jwt.verify)(token, authSecret);
    req.decode = decode;
  } catch (err) {
    return res.status(401).send(errorHandler("Usuário token invalido."));
  }

  return next();
};
