if (process.env.NODE_ENV !== "production") {
  switch (process.env.NODE_ENV) {
    case "development":
      require("dotenv").config({ path: ".env" });
      break;
    case "remote":
      require("dotenv").config({ path: ".env.remote" });
      break;
    case "test":
      require("dotenv").config({ path: ".env.test" });
      break;
    default:
      require("dotenv").config({ path: ".env" });
      break;
  }
}

module.exports = {
  mode: process.env.NODE_ENV,
  authSecret: process.env.APP_SECRET,
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
  },
  client: {
    host: process.env.CLIENT_HOST
  }
};
