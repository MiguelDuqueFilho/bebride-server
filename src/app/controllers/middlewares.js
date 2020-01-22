const { mode, authSecret } = require("../../config/config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = app => {
  const timescan = (req, res, next) => {
    if (mode !== "production") {
      var m = new Date();
      const dateString = `${m.getFullYear()}/${m.getMonth() +
        1} ${m.getDate()} ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
      console.log(
        `>> Time: ${dateString} -- Remote Address: ${req.connection.remoteAddress} -- Host Address: ${req.hostname} -- Protocol: ${req.protocol} -- Request Type: ${req.method} -- Request URL: ${req.originalUrl}`
      );
    }

    next();
  };

  const authuser = async (req, res, next) => {
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

    next();
  };

  return { timescan, authuser };
};
