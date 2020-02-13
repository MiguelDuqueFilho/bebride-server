const { Event, EventStatu, EventType } = require("../../app/models");
const { existsOrError, equalsOrError } = require("../../util/validation");

const { errorHandler, returnsData } = require("../../util/respHandler");

class EventsController {
  get(req, res) {
    Event.findAll({
      attributes: ["id", "eventName", "eventDescription"],
      include: [
        {
          model: EventType,
          attributes: ["eventTypeName"]
        },
        {
          model: EventStatu,
          attributes: ["eventStatusName"]
        }
      ]
    })
      .then(events =>
        res.status(200).send(returnsData("Consulta Realizada!!", events))
      )
      .catch(err => {
        res.status(500).send(errorHandler("Erro interno lista Eventos", err));
      });
  }

  async save(req, res) {
    const event = { ...req.body };
    console.log(event);
    try {
      existsOrError(event.eventName, "Nome do evento não informado");
      existsOrError(event.eventDescription, "Descrição não informado");
      existsOrError(event.eventStart, "Data de inicio do evento não informada");
      existsOrError(event.eventDate, "Data do evento não informada");
      existsOrError(event.eventStart, "Data do evento não informada");
      existsOrError(event.eventFinish, "Data de término não informada");
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
        eventStatusId: event.eventStatusId
        // addressId: event.addressId
      });
      res.status(200).send(returnsData("Consulta Realizada!!", null));
    } catch (err) {
      return res.status(500).send(errorHandler(err));
    }
  }
}
module.exports = new EventsController();
