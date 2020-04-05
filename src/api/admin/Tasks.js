const { Task, TaskStatu, TaskSection } = require("../../app/models");
const { existsOrError } = require("../../util/validation");

const { errorHandler, returnsData } = require("../../util/respHandler");

class TasksController {
  async get(req, res) {
    const page = parseInt(req.query.page) || 1;
    const paginate = parseInt(req.query.limit) || 1;

    try {
      const resp = await Task.paginate({
        page,
        paginate,
        include: [
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
    const Task = { ...req.body };
    try {
      existsOrError(Task.TaskName, "Nome do Tasko não informado");
      existsOrError(Task.TaskDescription, "Descrição não informado");
      existsOrError(Task.TaskStart, "Data de inicio do Tasko não informada");
      existsOrError(Task.TaskDate, "Data do Tasko não informada");
      existsOrError(Task.TaskStart, "Data do Tasko não informada");
      existsOrError(Task.TaskFinish, "Data de término não informada");
      existsOrError(Task.TaskTypeId, "Tipo de Tasko não informado");
      existsOrError(Task.TaskStatusId, "Status do Tasko não informado");
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
    try {
      await Task.create({
        TaskName: Task.TaskName,
        TaskDescription: Task.TaskDescription,
        TaskStart: Task.TaskStart,
        TaskDate: Task.TaskDate,
        TaskStart: Task.TaskStart,
        TaskFinish: Task.TaskFinish,
        TaskTypeId: Task.TaskTypeId,
        TaskStatusId: Task.TaskStatusId,
        // addressId: Task.addressId
      });
      res.status(200).send(returnsData("Consulta Realizada!!", null));
    } catch (err) {
      return res.status(500).send(errorHandler(err));
    }
  }

  async update(req, res) {
    const task = { ...req.body };
    if (req.params.id) Task.id = req.params.id;
    try {
      conosle.log(task);
      const TaskFromDB = await Task.findOne({
        where: { id: task.id },
      });

      if (!TaskFromDB) {
        return res.status(500).send(errorHandler("Tasko não cadastrado"));
      }

      try {
        existsOrError(task.taskName, "Nome do task não informado");
      } catch (err) {
        return res.status(400).send(errorHandler(err));
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(errorHandler(err));
    }

    try {
      await Task.update(Task, {
        where: { id: Task.id },
      });

      Task.findAll({
        where: { id: Task.id },
      })
        .then((Task) => res.send(returnsData("Tasko Atualizado!!", Task)))
        .catch((err) => res.status(500).send(errorHandler(err)));
    } catch (err) {
      return res.status(500).json(errorHandler(err));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const TaskFromDB = await Task.destroy({
        where: { id },
      });
      existsOrError(TaskFromDB, "Tasko Não encontrado!");

      return res.status(200).send(returnsData("Tasko excluido!!", null));
    } catch (err) {
      return res.status(400).send(errorHandler(err));
    }
  }

  getTypes(req, res) {
    TaskType.findAll({
      where: { TaskTypeShow: 1 },
    })
      .then((TaskTypes) =>
        res.status(200).send(returnsData("Consulta Realizada!!", TaskTypes))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista tipos de Taskos", err));
      });
  }

  getStatus(req, res) {
    TaskStatu.findAll()
      .then((TaskStatus) =>
        res.status(200).send(returnsData("Consulta Realizada!!", TaskStatus))
      )
      .catch((err) => {
        res
          .status(500)
          .send(errorHandler("Erro interno lista tipos de Taskos", err));
      });
  }
}
module.exports = new TasksController();
