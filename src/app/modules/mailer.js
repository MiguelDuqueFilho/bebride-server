const { email } = require("../../config/config");
const { resolve } = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  host: email.host,
  port: email.port,
  secure: false,
  auth: {
    user: email.user,
    pass: email.pass
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: resolve(__dirname, "..", "resources", "email"),
    layoutsDir: resolve(__dirname, "..", "resources", "email"),
    defaultLayout: false
  },
  viewPath: resolve(__dirname, "..", "resources", "email"),
  extName: ".hbs"
};

transport.use("compile", hbs(handlebarOptions));

module.exports = transport;
