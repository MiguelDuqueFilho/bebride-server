const express = require("express");
const cors = require("cors");
const timescan = require("./app/middlewares/timescan");
const routesSession = require("./routes/routesSession");
const routesUser = require("./routes/routesUser");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(timescan);
  }

  routes() {
    this.express.use(routesUser);
    this.express.use(routesSession);
  }
}

module.exports = new AppController().express;
