"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("task_models", [
      {
        id: 1,
        task_section_id: 1,
        task_model_name: "Marco inicial do Projeto",
        task_model_description: "Marco inicial do Projeto",
        task_model_duration: 1,
        task_model_predecessor: 0,
        task_model_successor: 2,
      },
      {
        id: 2,
        task_section_id: 1,
        task_model_name: "Data do Evento",
        task_model_description: "Data do Evento",
        task_model_duration: 1,
        task_model_predecessor: 1,
        task_model_successor: 3,
      },
      {
        id: 3,
        task_section_id: 1,
        task_model_name: "Data de Término do Projeto",
        task_model_description: "Data de Término do Projeto",
        task_model_duration: 1,
        task_model_predecessor: 2,
        task_model_successor: 0,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("task_models", null, {});
  },
};
