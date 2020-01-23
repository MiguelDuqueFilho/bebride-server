const { authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "user not provider" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decode = await promisify(jwt.verify)(token, authSecret);
    req.userId = decode.id;
  } catch (err) {
    return res.status(401).json({ message: "User invalid token" });
  }

  return next();
};
