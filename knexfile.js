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
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeders"
    }
  }
};
