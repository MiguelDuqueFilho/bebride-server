const express = require("express");
const cors = require("cors");
const timeScan = require("./app/middlewares/timeScan");
//const errorHandler = require("./app/middlewares/errorHandler");
const routesSession = require("./routes/routesSession");
const routesUser = require("./routes/routesUser");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(timeScan);
  }

  routes() {
    this.express.use(routesSession);
    this.express.use(routesUser);
  }

  errors() {
    // this.express.use(errorHandler);
    // this.express.use(function(err, req, res, next) {
    //   console.log(`>> ErrorHandle in next() =  ${err.message}`);
    //   res.status(500).send({ Error: err.stack });
    // });
  }
}

module.exports = new AppController().express;
