const path = require("path");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { querySearchEventId } = require("../../util/utils");
const { existsOrError } = require("../../util/validation");
const { Deposition, Event } = require("../../app/models");

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
        "depositionUploadId",
        "depositionFilename",
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
        "depositionUploadId",
        "depositionFilename",
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
      existsOrError(deposition.depositionTitle, "Titulo não informado");
      existsOrError(
        deposition.depositionDescription,
        "Descrição não informado"
      );
      existsOrError(deposition.depositionUrlphoto, "Filename não informado.");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
    try {
      await Deposition.create({
        depositionTitle: deposition.depositionTitle,
        depositionDescription: deposition.depositionDescription,
        depositionUrlphoto: deposition.depositionUrlphoto,
        depositionShow: deposition.depositionShow,
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
      const depositionFromDB = await Deposition.findOne({
        where: { id: deposition.id },
      });

      if (!depositionFromDB) {
        return res.status(500).send(errorHandler("depoimento não cadastrado"));
      }

      try {
        existsOrError(deposition.depositionTitle, "Titulo não informado");
        existsOrError(
          deposition.depositionDescription,
          "Descrição não informado"
        );
        existsOrError(
          deposition.depositionUrlphoto,
          "Url da foto não informado."
        );
      } catch (err) {
        return res.status(400).send(errorHandler(err));
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err));
    }

    try {
      await Deposition.update(deposition, {
        where: { id: deposition.id },
      });

      Deposition.findAll({
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
      const depositionFromDB = await Deposition.destroy({
        where: { id },
      });
      existsOrError(depositionFromDB, "Depoimento Não encontrado!");

      return res.status(200).send(returnsData("Depoimento excluido!!", null));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }
}

module.exports = new DepositionsController();
