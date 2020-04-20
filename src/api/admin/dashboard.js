const { Task, TaskStatu } = require("../../app/models");
const Sequelize = require("sequelize");
const { querySearchEventId } = require("../../util/utils");
const { errorHandler, returnsData } = require("../../util/respHandler");

class DashboardController {
  async get(req, res) {
    const search = req.query.search;

    const where = querySearchEventId(search);

    try {
      const respTotal = await Task.findAll({
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

      const respTaskPercent = await Task.findAll({
        attributes: ["id", "taskName", "taskCompleted"],
        where,
      });

      let taskSummary = {};
      let taskPercent = {};

      if (respTotal) {
        taskSummary = respTotal;
      }

      if (respTaskPercent) {
        taskPercent = respTaskPercent;
      }

      let summary = {};
      summary = { ...summary, taskSummary };
      summary = { ...summary, taskPercent };

      res.status(200).send(returnsData("Consulta Realizada!!", summary));
    } catch (error) {
      res.status(500).send(errorHandler("Erro interno lista Tasks", error));
    }
  }
}

module.exports = new DashboardController();
