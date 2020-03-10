const path = require("path");

class DownloadsController {
  get(req, res) {
    return res
      .status(200)
      .send({ filename: "planner01.pdf", description: "Teste Description" });
  }

  getFile(req, res) {
    var file = req.params.file;
    var fileLocation = path.join("./downloads", file);

    res.download(fileLocation, file);
  }
}

module.exports = new DownloadsController();
