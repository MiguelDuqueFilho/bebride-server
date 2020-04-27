const path = require("path");
const fs = require("fs");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { existsOrError } = require("../../util/validation");
const { Download } = require("../../app/models");
const { Upload } = require("../../app/models");

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
          "downloadShow",
          "uploadId",
        ],
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
        "downloadFilename",
        "uploadId",
      ],
      where: { downloadShow: true },
    })
      .then((file) =>
        res.status(200).send(returnsData("Consulta Realizada!!", file))
      )
      .catch((err) =>
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
      existsOrError(download.uploadId, "id de Upload não informado.");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    try {
      const uploadFromDb = await Upload.findOne({
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
        where: { id: download.uploadId },
      });

      if (!uploadFromDb) {
        return res.status(500).send(errorHandler("upload não encontrado"));
      }

      const downloadFromDb = await Download.create({
        downloadTitle: download.downloadTitle,
        downloadDescription: download.downloadDescription,
        downloadFilename: uploadFromDb.filePath,
        downloadShow: download.downloadShow,
        uploadId: download.uploadId,
      });

      if (!downloadFromDb) {
        return res
          .status(500)
          .send(errorHandler("Erro ao inserir o download."));
      }

      const fileLocationOrig = uploadFromDb.filePath;
      const fileLocationDest = path.join(
        "src/downloads",
        `download_${downloadFromDb.id}${path.extname(fileLocationOrig)}`
      );

      fs.access(fileLocationOrig, (error) => {
        if (!error) {
          fs.copyFileSync(fileLocationOrig, fileLocationDest);
          res.status(200).send(returnsData("Download Criado!!", null));
        } else {
          return res
            .status(400)
            .send(errorHandler("Arquivo upload não encontrado!!", error));
        }
      });
    } catch (err) {
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const download = { ...req.body };
    if (req.params.id) download.id = req.params.id;

    try {
      const downloadFromDB = await Download.findOne({
        where: { id: download.id },
      });

      if (!downloadFromDB) {
        return res.status(500).send(errorHandler("Download não cadastrado"));
      }
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    try {
      existsOrError(download.downloadTitle, "Titulo não informado");
      existsOrError(download.downloadDescription, "Descrição não informado");
      existsOrError(download.downloadFilename, "Filename não informado.");
      existsOrError(
        download.downloadFilename,
        "Filename de Upload não informado."
      );
      existsOrError(download.uploadId, "id de Upload não informado.");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    try {
      const downloadUpdateDb = await Download.update(download, {
        where: { id: download.id },
      });
      if (!downloadUpdateDb) {
        return res
          .status(500)
          .send(errorHandler("Erro ao atualizar o download."));
      }

      if (downloadUpdateDb.downloadUploadId !== download.downloadUploadId) {
        const uploadFromDb = await Upload.findOne({
          attributes: [
            "id",
            "fileName",
            "fileType",
            "filePath",
            "fileSize",
            "fileUse",
          ],
          where: { id: download.downloadUploadId },
        });

        if (!uploadFromDb) {
          return res.status(500).send(errorHandler("upload não encontrado"));
        }

        const fileLocationOld = path.join(
          "src/downloads",
          `download_${download.id}${path.extname(
            downloadFromDB.downloadFilename
          )}`
        );

        fs.unlinkSync(fileLocationOld);

        const fileLocationOrig = uploadFromDb.filePath;
        const fileLocationDest = path.join(
          "src/downloads",
          `download_${download.id}${path.extname(fileLocationOrig)}`
        );

        fs.access(fileLocationOrig, (error) => {
          if (!error) {
            fs.copyFileSync(fileLocationOrig, fileLocationDest);
            Download.findAll({
              where: { id: download.id },
            })
              .then((file) =>
                res.send(returnsData("Download Atualizado!!", file))
              )
              .catch((err) => res.status(500).send(errorHandler(err)));
          } else {
            return res
              .status(400)
              .send(errorHandler("Arquivo upload não encontrado!!", error));
          }
        });
      }
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const downloadFromDB = await Download.findOne({
        where: { id },
      });

      const downloadDelDB = await Download.destroy({
        where: { id },
      });
      existsOrError(downloadDelDB, "Download Não encontrado!");

      const uploadFromDb = await Upload.findOne({
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
        where: { id: downloadFromDB.downloadUploadId },
      });

      if (!uploadFromDb) {
        return res.status(500).send(errorHandler("upload não encontrado"));
      }

      var fileLocation = path.join(
        "src/downloads",
        `download_${download.id}${path.extname(uploadFromDb.filePath)}`
      );

      fs.access(fileLocation, (error) => {
        if (!error) {
          fs.unlinkSync(fileLocation, function (error) {
            if (err) {
              return res
                .status(400)
                .send(errorHandler("erro no delete do arquivo!!", error));
            } else {
              return res
                .status(200)
                .send(returnsData("Download excluido!!", null));
            }
          });
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

  async getFile(req, res) {
    var file = req.params.file;

    const downloadFromDB = await Download.findOne({
      where: { id: file },
    });

    if (!downloadFromDB) {
      return res.status(500).send(errorHandler("Download não encontrado."));
    }

    var fileLocation = path.join(
      "src/downloads",
      `download_${file}${path.extname(downloadFromDB.downloadFilename)}`
    );
    res.download(fileLocation, downloadFromDB.downloadFilename);
  }
}
module.exports = new DownloadsController();
