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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DIALECT || "mysql",
  storage: "./__tests__/database.sqlite",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
