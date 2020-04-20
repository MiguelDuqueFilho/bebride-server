const { Event, EventStatu, EventType } = require("../../app/models");
const { existsOrError, equalsOrError } = require("../../util/validation");
const { querySearchId } = require("../../util/utils");
const { errorHandler, returnsData } = require("../../util/respHandler");

class EventsController {
  async get(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;
    const search = req.query.search;

    const where = querySearchId(search, "eventName");
    try {
      const resp = await Event.paginate({
        page,
        paginate,
        where,
        order: [
          ["eventStatusId", "ASC"],
          ["id", "DESC"],
        ],
        include: [
          {
            model: EventType,
            attributes: ["eventTypeName"],
          },
          {
            model: EventStatu,
            attributes: ["eventStatusName"],
          },
        ],
      });
      resp.page = page;
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res.status(500).send(errorHandler("Erro interno lista Eventos", error));
    }
  }

  getById(req, res) {
    const { id } = req.params;
    Event.findAll({
      where: { id },
    })
      .then((event) =>
        res.status(200).send(returnsData("Consulta Realizada!!", event))
      )
      .catch((err) =>
        res.status(500).send(errorHandler("Usuário não encontrado...", err))
      );
  }

  async save(req, res) {
    const event = { ...req.body };
    try {
      existsOrError(event.eventName, "Nome do evento não informado");
      existsOrError(event.eventDescription, "Descrição não informado");
      existsOrError(event.eventStart, "Data de inicio do evento não informada");
      existsOrError(event.eventDate, "Data do evento não informada");
      existsOrError(event.eventStart, "Data do evento não informada");
      existsOrError(event.eventFinish, "Data de término não informada");
      existsOrError(event.eventTypeId, "Tipo de evento não informado");
      existsOrError(event.eventStatusId, "Status do evento não informado");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
    try {
      await Event.create({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventStart: event.eventStart,
        eventDate: event.eventDate,
        eventStart: event.eventStart,
        eventFinish: event.eventFinish,
        eventTypeId: event.eventTypeId,
        eventStatusId: event.eventStatusId,
        // addressId: event.addressId
      });
      res.status(200).send(returnsData("Consulta Realizada!!", null));
    } catch (err) {
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const event = { ...req.body };
    if (req.params.id) event.id = req.params.id;
    try {
      const eventFromDB = await Event.findOne({
        where: { id: event.id },
      });

      if (!eventFromDB) {
        return res.status(500).send(errorHandler("Evento não cadastrado"));
      }

      try {
        existsOrError(event.eventName, "Nome do evento não informado");
        existsOrError(event.eventDescription, "Descrição não informado");
        existsOrError(
          event.eventStart,
          "Data de inicio do evento não informada"
        );
        existsOrError(event.eventDate, "Data do evento não informada");
        existsOrError(event.eventStart, "Data do evento não informada");
        existsOrError(event.eventFinish, "Data de término não informada");
      } catch (err) {
        return res.status(400).send(errorHandler(err));
      }
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }

    try {
      await Event.update(event, {
        where: { id: event.id },
      });

      Event.findAll({
        where: { id: event.id },
      })
        .then((event) => res.send(returnsData("Evento Atualizado!!", event)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const eventFromDB = await Event.destroy({
        where: { id },
      });
      existsOrError(eventFromDB, "Evento Não encontrado!");

      return res.status(200).send(returnsData("Evento excluido!!", null));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  getTypes(req, res) {
    EventType.findAll({
      where: { eventTypeShow: 1 },
    })
      .then((eventTypes) =>
        res.status(200).send(returnsData("Consulta Realizada!!", eventTypes))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista tipos de Eventos", err));
      });
  }

  getStatus(req, res) {
    EventStatu.findAll()
      .then((eventStatus) =>
        res.status(200).send(returnsData("Consulta Realizada!!", eventStatus))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista tipos de Eventos", err));
      });
  }
}
module.exports = new EventsController();
