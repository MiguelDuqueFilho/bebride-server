const path = require("path"); // or you can use the require('chalk') syntax too
const morgan = require("morgan");
const chalk = require("chalk");
const rfs = require("rotating-file-stream");

const morganDevColor = morgan(function (tokens, req, res) {
  return [
    chalk.white(tokens.date(req, res, "iso")),
    chalk.yellow(tokens.status(req, res)),
    chalk.hex("#2ed573")(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.hex("#ffb142")(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});

// create a rotating write stream

const accessLogStream = rfs.createStream("access.log", {
  interval: "2d", // rotate daily
  path: path.join(__dirname, "log"),
});

const morganLog = morgan("combined");
const morganLogStream = morgan("combined", { stream: accessLogStream });
const morganDev = morgan("dev");

module.exports = {
  morganLogStream,
  morganDev,
  morganLog,
  morganDevColor,
};
