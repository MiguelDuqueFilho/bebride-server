"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("task_status", [
      {
        id: 1,
        task_status_name: "Inicial",
        task_status_color: "info",
      },
      {
        id: 2,
        task_status_name: "Em dia",
        task_status_color: "success",
      },
      {
        id: 3,
        task_status_name: "Alerta",
        task_status_color: "warning",
      },
      {
        id: 4,
        task_status_name: "Atrasada",
        task_status_color: "danger",
      },
      {
        id: 5,
        task_status_name: "Concluída",
        task_status_color: "secundary",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("task_status", null, {});
  },
};
