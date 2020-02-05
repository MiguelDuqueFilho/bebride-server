const { email } = require("../../config/config");
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
    partialsDir: "src/app/resources/email/",
    layoutsDir: "src/app/resources/email/",
    defaultLayout: "forgot_password.hbs"
  },
  viewPath: "src/app/resources/email/",
  extName: ".hbs"
};

transport.use("compile", hbs(handlebarOptions));

module.exports = transport;
