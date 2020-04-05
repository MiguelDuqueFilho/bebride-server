const express = require("express");
const cors = require("cors");
const timeScan = require("./app/middlewares/timeScan");
const routesSession = require("./routes/routesSession");
const routesAdmin = require("./routes/routesAdmin");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(timeScan);
  }

  routes() {
    this.express.use(routesSession);
    this.express.use(routesAdmin);
  }
}

module.exports = new AppController().express;
