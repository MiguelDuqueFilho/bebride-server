require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

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
  logging: false, //console.log
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
