require("dotenv").config();
const { db } = require("./src/config/config");

module.exports = {
  development: {
    client: "mysql2",
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
