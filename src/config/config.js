require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  mode: process.env.NODE_ENV,
  authSecret: process.env.APP_SECRET,
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
  frontUrl: process.env.FRONT_URL,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
