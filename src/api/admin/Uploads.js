const path = require("path");
const fs = require("fs");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { existsOrError } = require("../../util/validation");
const { Upload } = require("../../app/models");
const { IncomingForm } = require("formidable");

class UploadsController {
  async get(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;

    try {
      const resp = await Upload.paginate({
        page,
        paginate,
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
      });
      resp.page = page;
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res
        .status(500)
        .send(errorHandler("Erro na consulta de Uploads...", error));
    }
  }

  async getType(req, res) {
    const { type } = req.params;
    let where = {};
    switch (type) {
      case "img":
        where = {
          $or: [{ fileType: "jpg" }, { fileType: "jpeg" }, { fileType: "png" }],
        };
        break;
      case "pdf":
        where = {
          fileType: "pdf",
        };
        break;
      default:
        break;
    }

    try {
      const resp = await Upload.findAll({
        where,
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
      });
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res
        .status(500)
        .send(errorHandler("Erro na consulta de Uploads...", error));
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const resp = await Upload.findOne({
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
        where: { id },
      });
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res
        .status(500)
        .send(errorHandler("Erro na consulta de Uploads...", error));
    }
  }

  async update(req, res) {
    const upload = { ...req.body };
    if (req.params.id) upload.id = req.params.id;

    const uploadFromDB = await Upload.findOne({
      where: { id: upload.id },
    });

    if (!uploadFromDB) {
      return res.status(500).send(errorHandler("Upload não cadastrado"));
    }

    try {
      await Upload.update(upload, {
        where: { id: upload.id },
      });

      Upload.findAll({
        where: { id: upload.id },
      })
        .then((file) => res.send(returnsData("Upload Atualizado!!", file)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const uploadFromDB = await Upload.findOne({
        where: { id },
      });

      const uploadDelDB = await Upload.destroy({
        where: { id },
      });
      existsOrError(uploadDelDB, "Upload Não encontrado!");

      fs.access(uploadFromDB.filePath, (error) => {
        if (!error) {
          fs.unlinkSync(uploadFromDB.filePath, function (error) {
            return res
              .status(400)
              .send(errorHandler("erro no delete do arquivo!!", error));
          });
          return res.status(200).send(returnsData("Upload excluido!!", null));
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

  upload(req, res) {
    const fileLocation = path.join("src/uploads", "/");

    const options = {
      multiples: true,
      uploadDir: fileLocation,
      keepExtensions: true,
    };

    const form = new IncomingForm(options);

    form.on("file", (field, file) => {
      let type = file.type;
      type = type.replace("application/", "");
      type = type.replace("image/", "");
      type = type.replace("video/", "");

      Upload.create({
        fileName: file.name,
        fileType: type,
        filePath: file.path,
        fileSize: parseInt(file.size),
        fileUse: false,
      })
        .then((upl) => {})
        .catch((err) => console.log(err));
    });
    form.on("end", () => {
      res.json();
    });
    form.parse(req);
  }
}
module.exports = new UploadsController();
