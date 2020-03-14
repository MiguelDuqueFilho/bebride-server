const path = require("path");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { existsOrError } = require("../../util/validation");
const { Download } = require("../../app/models");
const { IncomingForm } = require("formidable");

class DownloadsController {
  async getAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;

    try {
      const resp = await Download.paginate({
        page,
        paginate,
        attributes: [
          "id",
          "downloadTitle",
          "downloadDescription",
          "downloadFilename",
          "downloadShow"
        ]
      });
      resp.page = page;
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res
        .status(500)
        .send(errorHandler("Erro na consulta de downloads...", error));
    }
  }

  get(req, res) {
    Download.findAll({
      attributes: [
        "id",
        "downloadTitle",
        "downloadDescription",
        "downloadFilename"
      ],
      where: { downloadShow: true }
    })
      .then(file =>
        res.status(200).send(returnsData("Consulta Realizada!!", file))
      )
      .catch(err =>
        res
          .status(500)
          .send(errorHandler("Erro na consulta de downloads...", err))
      );
  }

  async save(req, res) {
    const download = { ...req.body };

    try {
      existsOrError(download.downloadTitle, "Titulo não informado");
      existsOrError(download.downloadDescription, "Descrição não informado");
      existsOrError(download.downloadFilename, "Filename não informado.");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    try {
      await Download.create({
        downloadTitle: download.downloadTitle,
        downloadDescription: download.downloadDescription,
        downloadFilename: download.downloadFilename,
        downloadShow: download.downloadShow
      });
      res.status(200).send(returnsData("Consulta Realizada!!", null));
    } catch (err) {
      console.log(err);
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const download = { ...req.body };
    if (req.params.id) download.id = req.params.id;
    try {
      const downloadFromDB = await Download.findOne({
        where: { id: download.id }
      });

      if (!downloadFromDB) {
        return res.status(500).send(errorHandler("Download não cadastrado"));
      }

      try {
        existsOrError(download.downloadTitle, "Titulo não informado");
        existsOrError(download.downloadDescription, "Descrição não informado");
        existsOrError(download.downloadFilename, "Filename não informado.");
      } catch (err) {
        return res.status(400).send(errorHandler(err));
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err));
    }

    try {
      await Download.update(download, {
        where: { id: download.id }
      });

      Download.findAll({
        where: { id: download.id }
      })
        .then(file => res.send(returnsData("Download Atualizado!!", file)))
        .catch(err => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const downloadFromDB = await Download.destroy({
        where: { id }
      });
      existsOrError(downloadFromDB, "Download Não encontrado!");

      return res.status(200).send(returnsData("Download excluido!!", null));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  getFile(req, res) {
    var file = req.params.file;
    var fileLocation = path.join("src/downloads", file);

    res.download(fileLocation, file);
  }

  upload(req, res) {
    const fileLocation = path.join("src/uploads", "/");

    const options = {
      multiples: true,
      uploadDir: fileLocation,
      keepExtensions: true
    };

    const form = new IncomingForm(options);

    form.on("file", (field, file) => {
      console.log("file >>>>>>>>> -------------------- >>>>>>>>>>  ");
      console.log("file.path >>>>>>>>> path temporario ");
      console.log(file.path);
      console.log("file.name >>>>>>>>> nome do arquivo original");
      console.log(file.name);
      console.log("file.type >>>>>>>>> tipo do arquivo ex: application/pdf");
      console.log(file.type.replace("/application/", ""));
      console.log("file.size >>>>>>>>> tamanho do arquivo em bytes");
      console.log(file.size);
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
    });
    form.on("end", () => {
      console.log("end  >>>>>>>>> -------------------- >>>>>>>>>>  ");
      res.json();
    });
    form.parse(req);
  }
}
module.exports = new DownloadsController();
