const express = require("express");
// const rfs = require("rotating-file-stream");
// const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const timeScan = require("./app/middlewares/timeScan");
const errorCustom = require("./app/middlewares/errorCustom");
const routesSession = require("./routes/routesSession");
const routesAdmin = require("./routes/routesAdmin");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares() {
    // create a rotating write stream
    // var accessLogStream = rfs.createStream("access.log", {
    //   interval: "1d", // rotate daily
    //   path: path.join(__dirname, "log"),
    // });
    // setup the logger
    // this.express.use(morgan("combined", { stream: accessLogStream }));
    // this.express.use(morgan("combined"));
    this.express.use(morgan("dev"));
    // this.express.use(timeScan);
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use("/images", express.static(__dirname + "/Images"));
    this.express.use("/files", express.static(__dirname + "/Files"));

    this.express.use(routesSession);
    this.express.use(routesAdmin);
  }

  handleErrors() {
    this.express.use(errorCustom);
  }
}

module.exports = new AppController().express;
