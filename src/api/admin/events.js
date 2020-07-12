const path = require("path");
const fs = require("fs");
const { Event, EventStatu, EventType, Upload } = require("../../app/models");
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
        order: [["id", "DESC"]],
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
    event.eventFilename = "NONE.jpeg";
    try {
      existsOrError(event.eventName, "Nome do evento não informado");
      existsOrError(event.eventDescription, "Descrição não informado");
      existsOrError(event.eventStart, "Data de inicio do evento não informada");
      existsOrError(event.eventDate, "Data do evento não informada");
      existsOrError(event.eventStart, "Data do evento não informada");
      existsOrError(event.eventFinish, "Data de término não informada");
      existsOrError(event.eventTypeId, "Tipo de evento não informado");
      existsOrError(event.eventStatusId, "Status do evento não informado");
      existsOrError(event.uploadId, "id de upload não informado");
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
        where: { id: event.uploadId },
      });

      if (!uploadFromDb) {
        return res.status(500).send(errorHandler("Foto não encontrada."));
      }

      const eventFromDb = await Event.create({
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventStart: event.eventStart,
        eventDate: event.eventDate,
        eventStart: event.eventStart,
        eventFinish: event.eventFinish,
        eventTypeId: event.eventTypeId,
        eventStatusId: event.eventStatusId,
        addressId: 0,
        eventFilename: event.eventFilename,
        uploadId: event.uploadId,
      });

      if (!eventFromDb) {
        return res.status(500).send(errorHandler("Evento não inserido!!"));
      }

      const fileLocationOrig = uploadFromDb.filePath;

      const fileLocationDest = path.join(
        "src/images/events",
        `event_${eventFromDb.id}${path.extname(uploadFromDb.filePath)}`
      );

      await Event.update(
        { eventFilename: fileLocationDest },
        {
          where: { id: eventFromDb.id },
        }
      );

      fs.access(fileLocationOrig, (error) => {
        if (!error) {
          fs.copyFileSync(fileLocationOrig, fileLocationDest);
          res.status(200).send(returnsData("Evento incluido!!", null));
        } else {
          return res
            .status(400)
            .send(errorHandler("Imagem não encontrada!!", error));
        }
      });
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
      if (eventFromDB.uploadId !== event.uploadId) {
        if (
          eventFromDB.eventFilename === null ||
          eventFromDB.eventFilename === ""
        ) {
          eventFromDB.eventFilename = "NONE.jpeg";
        }
        event.eventFilename = "NONE.jpeg";
        const uploadFromDb = await Upload.findOne({
          attributes: [
            "id",
            "fileName",
            "fileType",
            "filePath",
            "fileSize",
            "fileUse",
          ],
          where: { id: event.uploadId },
        });
        console.log(event);
        console.log(uploadFromDb);

        if (!uploadFromDb) {
          return res.status(500).send(errorHandler("Foto não encontrada."));
        }
        console.log(eventFromDB.eventFilename);
        fs.access(eventFromDB.eventFilename, (error) => {
          if (!error) {
            fs.unlinkSync(eventFromDB.eventFilename, (error) => {});
          }
        });

        const fileLocationOrig = uploadFromDb.filePath;
        const fileLocationDest = path.join(
          "src/images/events",
          `event_${event.id}${path.extname(fileLocationOrig)}`
        );
        console.log(fileLocationOrig);
        console.log(fileLocationDest);
        event.uploadId = uploadFromDb.id;
        event.eventFilename = fileLocationDest;

        await fs.access(fileLocationOrig, (error) => {
          if (!error) {
            fs.copyFileSync(fileLocationOrig, fileLocationDest);
          }
        });
      }

      await Event.update(event, {
        where: { id: event.id },
      });

      Event.findAll({
        where: { id: event.id },
      })
        .then((event) => res.send(returnsData("Evento Atualizado!!", event)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      console.log(err);
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const eventFromDB = await Event.findOne({
        where: { id },
      });

      existsOrError(eventFromDB, "Evento Não encontrado!");

      await Event.destroy({
        where: { id },
      });
      console.log(eventFromDB.eventFilename);
      fs.access(eventFromDB.eventFilename, (error) => {
        if (!error) {
          fs.unlinkSync(eventFromDB.eventFilename, function (error) {
            if (error) {
              console.log("Arquivo não deletado");
            }
          });
        }
      });

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
