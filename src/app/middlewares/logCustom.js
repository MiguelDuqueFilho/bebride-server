// or you can use the require('chalk') syntax too
const morgan = require("morgan");
const chalk = require("chalk");

const morganDevColor = morgan(function (tokens, req, res) {
  return [
    chalk.white(tokens.date(req, res, "iso")),
    chalk.yellow(tokens.status(req, res)),
    chalk.hex("#2ed573")(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.hex("#ffb142")(tokens["response-time"](req, res) + " ms"),
  ].join(" ");
});

module.exports = {
  morganDevColor,
};
