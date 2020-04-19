const { Task, TaskStatu } = require("../../app/models");
const Sequelize = require("sequelize");
const { querySearchEventId } = require("../../util/utils");
const { errorHandler, returnsData } = require("../../util/respHandler");

class DashboardController {
  async get(req, res) {
    const search = req.query.search;

    const where = querySearchEventId(search);

    let summary = {};

    try {
      const resp = await Task.findAll({
        attributes: [
          "taskStatusId",
          [Sequelize.fn("count", Sequelize.col("task_status_id")), "taskCount"],
        ],
        include: [
          {
            model: TaskStatu,
            attributes: ["taskStatusName"],
          },
        ],
        group: ["Task.task_status_id"],
        raw: true,
        where,
      });
      // chart 3
      let taskSummary = {};
      if (resp) {
        taskSummary = resp;
      }

      let summary = {};
      summary = { ...summary, taskSummary };

      res.status(200).send(returnsData("Consulta Realizada!!", summary));
    } catch (error) {
      console.log(error);
      res.status(500).send(errorHandler("Erro interno lista Tasks", error));
    }
  }
}

module.exports = new DashboardController();
