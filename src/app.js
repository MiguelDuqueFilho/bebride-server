const express = require("express");
const cors = require("cors");
const consign = require("consign");
const db = require("./config/db");

class AppController {
  constructor() {
    this.express = express();
    this.express.db = db;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    consign()
      .then("./src/api")
      .then("./src/routes.js")
      .into(this.express);
  }
}

module.exports = new AppController().express;
