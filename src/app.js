const express = require("express");
const cors = require("cors");

const { morganDevColor } = require("./app/middlewares/logCustom");
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
    // this.express.use((req, res, next) => {
    //   if (req.protocol === "http") {
    //     res.redirect(301, `https://${req.headers.host}${req.url}`);
    //   }
    //   next();
    // });
    this.express.use(morganDevColor);
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use("/images", express.static(__dirname + "/Images"));
    this.express.use("/files", express.static(__dirname + "/Files"));

    this.express.use("/api", routesSession);
    this.express.use("/api", routesAdmin);
  }

  handleErrors() {
    this.express.use(errorCustom);
  }
}

module.exports = new AppController().express;
