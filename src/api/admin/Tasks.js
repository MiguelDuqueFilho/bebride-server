const { Task, TaskStatu, TaskSection, Event } = require("../../app/models");
const { existsOrError } = require("../../util/validation");
const { errorHandler, returnsData } = require("../../util/respHandler");
const { Joi, celebrate, Segments } = require("celebrate");
const { querySearchTask } = require("../../util/utils");

class TasksController {
  async get(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;
    const search = req.query.search;

    const where = querySearchTask(search);

    try {
      const resp = await Task.paginate({
        page,
        paginate,
        where,
        attributes: [
          "id",
          "eventId",
          "taskModelId",
          "taskSectionId",
          "taskName",
          "taskDescription",
          "taskDuration",
          "taskStart",
          "taskTime",
          "taskFinish",
          "taskCompleted",
          "taskPredecessor",
          "taskSuccessor",
          "taskStatusId",
        ],
        include: [
          {
            model: Event,
            attributes: ["eventName"],
          },
          {
            model: TaskSection,
            attributes: ["taskSectionName"],
          },
          {
            model: TaskStatu,
            attributes: ["taskStatusName", "taskStatusColor"],
          },
        ],
      });
      resp.page = page;
      res.status(200).send(returnsData("Consulta Realizada!!", resp));
    } catch (error) {
      res.status(500).send(errorHandler("Erro interno lista Tasks", error));
    }
  }

  async save(req, res) {
    const task = { ...req.body };

    try {
      await Task.create({
        eventId: task.eventId,
        taskModelId: task.taskModelId,
        taskSectionId: task.taskSectionId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskDuration: task.taskDuration,
        taskStart: task.taskStart,
        taskTime: task.taskTime,
        taskFinish: task.taskFinish,
        taskCompleted: task.taskCompleted,
        taskPredecessor: task.taskPredecessor,
        taskSuccessor: task.taskSuccessor,
        taskStatusId: task.taskStatusId,
      });
      res.status(200).send(returnsData("Tarefa Criada!!", null));
    } catch (err) {
      console.log(err);
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const task = { ...req.body };
    if (req.params.id) task.id = req.params.id;

    const taskFromDB = await Task.findOne({
      where: { id: task.id },
    });

    if (!taskFromDB) {
      return res.status(500).send(errorHandler("Tarefa não cadastrada"));
    }

    try {
      await Task.update(task, {
        where: { id: task.id },
        individualHooks: true,
      });

      Task.findAll({
        where: { id: task.id },
      })
        .then((task) => res.send(returnsData("Tarefa Atualizada!!", task)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const TaskFromDB = await Task.destroy({
        where: { id },
      });
      existsOrError(TaskFromDB, "Tarefa não encontrada!");

      return res.status(200).send(returnsData("Tarefa excluida!!", null));
    } catch (err) {
      // next(err);
      return res.status(400).send(errorHandler(err));
    }
  }

  getSections(req, res) {
    TaskSection.findAll({
      attributes: ["id", "taskSectionName"],
    })
      .then((sections) =>
        res.status(200).send(returnsData("Consulta Realizada!!", sections))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista seções de tarefas", err));
      });
  }

  getStatus(req, res) {
    TaskStatu.findAll({
      attributes: ["id", "taskStatusName", "taskStatusColor"],
    })
      .then((status) =>
        res.status(200).send(returnsData("Consulta Realizada!!", status))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista status de tarefas", err));
      });
  }
}
module.exports.task = new TasksController();

const taskBodyValidate = Joi.object().keys({
  id: Joi.number().integer().optional().error(new Error("Id não numérico!")),
  eventId: Joi.number()
    .integer()
    .required()
    .error(new Error("Selecione um evento!")),
  taskModelId: Joi.number().integer().error(new Error("Modelo não informado!")),
  taskSectionId: Joi.number()
    .integer()
    .required()
    .error(new Error("Seção não informado!")),
  taskName: Joi.string()
    .required()
    .error(new Error("Nome da tarefa obrigatório!")),
  taskDescription: Joi.string()
    .required()
    .error(new Error("Descrição da tarefa obrigatório!")),
  taskDuration: Joi.number()
    .integer()
    .min(0)
    .required()
    .error(new Error("Duração da tarefa obrigatório!")),
  taskStart: Joi.date().required().error(new Error("Data Início inválida!")),
  taskTime: Joi.optional(),
  taskFinish: Joi.date()
    .min(Joi.ref("taskStart"))
    .optional()
    .error(new Error("Data Fim inválida!")),
  taskCompleted: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .error(new Error("Porcentagem deve ser de 0 a 100!")),
  taskPredecessor: Joi.number()
    .min(0)
    .required()
    .error(new Error("Predecessor da tarefa invalido!")),
  taskSuccessor: Joi.number()
    .min(0)
    .required()
    .error(new Error("Sucessor da tarefa invalido!")),
  taskStatusId: Joi.number()
    .min(1)
    .max(9)
    .required()
    .error(new Error("Status da tarefa invalido!")),
  Events: Joi.optional().strip(),
  TaskSections: Joi.optional().strip(),
  TaskStatus: Joi.optional().strip(),
});

const taskParamsValidate = Joi.object().keys({
  id: Joi.number().required().error(new Error("Id da tarefa inválido!")),
});

const taskQueryValidate = Joi.object().keys({
  page: Joi.number().optional().error(new Error("page deve ser numerico!")),
  limit: Joi.number().optional().error(new Error("limit deve ser numerico!")),
  search: Joi.optional(),
});

module.exports.getTaskValidate = celebrate({
  [Segments.QUERY]: taskQueryValidate,
});

module.exports.saveTaskValidate = celebrate({
  [Segments.BODY]: taskBodyValidate,
});

module.exports.updateTaskValidate = celebrate({
  [Segments.PARAMS]: taskParamsValidate.required(),
  [Segments.BODY]: taskBodyValidate.min(2),
});

module.exports.deleteTaskValidate = celebrate({
  [Segments.PARAMS]: taskParamsValidate.required(),
});
