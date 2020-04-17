const path = require("path");
const fs = require("fs");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { querySearchEventId } = require("../../util/utils");
const { existsOrError } = require("../../util/validation");
const { Joi, celebrate, Segments } = require("celebrate");
const { Deposition, Event, Upload } = require("../../app/models");

class DepositionsController {
  getAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;
    const search = req.query.search;

    const where = querySearchEventId(search, "depositionTitle");

    Deposition.paginate({
      page,
      paginate,
      where,
      attributes: [
        "id",
        "eventId",
        "depositionTitle",
        "depositionDescription",
        "uploadId",
        "depositionFilename",
        "depositionFiletype",
        "depositionShow",
      ],
      include: [
        {
          model: Event,
          attributes: ["eventName"],
        },
      ],
    })
      .then((dep) =>
        res.status(200).send(returnsData("Consulta Realizada!!", dep))
      )
      .catch((err) =>
        res
          .status(500)
          .send(errorHandler("Erro na consulta de depoimentos...", err))
      );
  }
  get(req, res) {
    Deposition.findAll({
      limit: 4,
      where: { depositionShow: true },
      order: [["updatedAt", "DESC"]],
      attributes: [
        "id",
        "eventId",
        "depositionTitle",
        "depositionDescription",
        "uploadId",
        "depositionFilename",
        "depositionFiletype",
        "updatedAt",
      ],
      include: [
        {
          model: Event,
          attributes: ["eventName"],
        },
      ],
    })
      .then((dep) =>
        res.status(200).send(returnsData("Consulta Realizada!!", dep))
      )
      .catch((err) =>
        res
          .status(500)
          .send(errorHandler("Erro na consulta de depoimentos...", err))
      );
  }

  async save(req, res) {
    const deposition = { ...req.body };

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
        where: { id: deposition.uploadId },
      });

      if (!uploadFromDb) {
        return res.status(500).send(errorHandler("Foto não encontrada."));
      }

      const depositionFromDb = await Deposition.create({
        eventId: deposition.eventId,
        depositionTitle: deposition.depositionTitle,
        depositionDescription: deposition.depositionDescription,
        uploadId: uploadFromDb.id,
        depositionFilename: uploadFromDb.fileName,
        depositionFiletype: uploadFromDb.fileType,
        depositionShow: deposition.depositionShow,
      });

      const fileLocationOrig = uploadFromDb.filePath;

      const fileLocationDest = path.join(
        "src/depositions",
        `deposition_${depositionFromDb.id}.img`
      );

      fs.access(fileLocationOrig, (error) => {
        if (!error) {
          fs.copyFileSync(fileLocationOrig, fileLocationDest);
        } else {
          return res
            .status(400)
            .send(errorHandler("Imagem não encontrada!!", error));
        }
      });

      res.status(200).send(returnsData("Depoimento incluido!!", null));
    } catch (err) {
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const deposition = { ...req.body };
    if (req.params.id) deposition.id = req.params.id;

    try {
      const depositionFindDB = await Deposition.findOne({
        where: { id: deposition.id },
      });

      if (!depositionFindDB) {
        return res.status(500).send(errorHandler("depoimento não cadastrado"));
      }
      const uploadFromDb = await Upload.findOne({
        attributes: [
          "id",
          "fileName",
          "fileType",
          "filePath",
          "fileSize",
          "fileUse",
        ],
        where: { id: deposition.uploadId },
      });

      if (uploadFromDb) {
        deposition.uploadId = uploadFromDb.id;
        deposition.depositionFilename = uploadFromDb.uploadId;
        deposition.depositionFiletype = uploadFromDb.uploadId;
      } else {
        return res.status(500).send(errorHandler("Foto não encontrada."));
      }

      await Deposition.update(deposition, {
        where: { id: deposition.id },
      });

      const fileLocationOrig = uploadFromDb.filePath;

      const fileLocationDest = path.join(
        "src/depositions",
        `deposition_${deposition.id}.img`
      );

      fs.access(fileLocationOrig, (error) => {
        if (!error) {
          fs.copyFileSync(fileLocationOrig, fileLocationDest);
        } else {
          return res
            .status(400)
            .send(errorHandler("Imagem não encontrada!!", error));
        }
      });

      Deposition.findOne({
        where: { id: deposition.id },
      })
        .then((dep) => res.send(returnsData("Depoimento Atualizado!!", dep)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const depositionFindDB = await Deposition.findOne({
        where: { id },
      });

      existsOrError(depositionFindDB, "Depoimento Não encontrado!");

      await Deposition.destroy({
        where: { id },
      });

      var fileLocation = path.join("src/depositions", `deposition_${id}.img`);

      fs.access(fileLocation, (error) => {
        if (!error) {
          fs.unlinkSync(fileLocation, function (error) {
            return res
              .status(400)
              .send(
                errorHandler(
                  "Depoimento excluido!, mas com erro no delete da foto!!",
                  error
                )
              );
          });
          return res
            .status(200)
            .send(returnsData("Depoimento excluido!!", null));
        } else {
          return res
            .status(400)
            .send(errorHandler("Foto não encontrada!!", error));
        }
      });
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }
}

module.exports.deposition = new DepositionsController();

const depositionBodyValidate = Joi.object().keys({
  id: Joi.number().integer().optional().error(new Error("Id não numérico!")),
  eventId: Joi.number()
    .integer()
    .required()
    .error(new Error("Selecione um evento!")),
  depositionTitle: Joi.string()
    .required()
    .error(new Error("Titulo do depoimento obrigatório!")),
  depositionDescription: Joi.string()
    .required()
    .error(new Error("Descrição do depoimento obrigatório!")),
  uploadId: Joi.number()
    .integer()
    .min(0)
    .required()
    .error(new Error("id da foto obrigatório!")),
  depositionFilename: Joi.optional().strip(),
  depositionFiletype: Joi.optional().strip(),
  depositionShow: Joi.boolean()
    .required()
    .error(new Error("Mostrar depoimento invalido!")),
  Events: Joi.optional().strip(),
});

const depositionParamsValidate = Joi.object().keys({
  id: Joi.number().required().error(new Error("Id do depoimento inválido!")),
});

const depositionQueryValidate = Joi.object().keys({
  page: Joi.number().optional().error(new Error("page deve ser numerico!")),
  limit: Joi.number().optional().error(new Error("limit deve ser numerico!")),
  search: Joi.optional(),
});

module.exports.getDepositionValidate = celebrate({
  [Segments.QUERY]: depositionQueryValidate,
});

module.exports.saveDepositionValidate = celebrate({
  [Segments.BODY]: depositionBodyValidate,
});

module.exports.updateDepositionValidate = celebrate({
  [Segments.PARAMS]: depositionParamsValidate.required(),
  [Segments.BODY]: depositionBodyValidate.min(2),
});

module.exports.deleteDepositionValidate = celebrate({
  [Segments.PARAMS]: depositionParamsValidate.required(),
});
