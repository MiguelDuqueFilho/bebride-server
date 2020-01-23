const { mode } = require("../../config/config");

module.exports = (req, res, next) => {
  if (mode !== "production") {
    var m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
      1} ${m.getDate()} ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log(
      `>> Time: ${dateString} -- Remote Address: ${req.connection.remoteAddress} -- Host Address: ${req.hostname} -- Protocol: ${req.protocol} -- Request Type: ${req.method} -- Request URL: ${req.originalUrl}`
    );
  }

  return next();
};
