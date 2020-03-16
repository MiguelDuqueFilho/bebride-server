const path = require("path");
const fs = require("fs");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { existsOrError } = require("../../util/validation");
const { Download } = require("../../app/models");
const { Upload } = require("../../app/models");
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
      const downloadFromDB = await Download.findOne({
        where: { id }
      });

      const downloadDelDB = await Download.destroy({
        where: { id }
      });
      existsOrError(downloadDelDB, "Download Não encontrado!");

      var fileLocation = path.join(
        "src/downloads",
        downloadFromDB.downloadFilename
      );

      console.log("fileLocation>>>>>>>>");
      console.log(fileLocation);

      fs.access(fileLocation, error => {
        if (!error) {
          fs.unlinkSync(fileLocation, function(error) {
            return res
              .status(400)
              .send(errorHandler("erro no delete do arquivo!!", error));
          });
          return res.status(200).send(returnsData("Download excluido!!", null));
        } else {
          return res
            .status(400)
            .send(errorHandler("Arquivo não encontrado!!", error));
        }
      });
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  getFile(req, res) {
    var file = req.params.file;
    var fileLocation = path.join("src/downloads", file);

    res.download(fileLocation, file);
  }
}
module.exports = new DownloadsController();
