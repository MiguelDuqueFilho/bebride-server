"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("task_sections", [
      {
        id: 1,
        task_section_name: "Tarefas do Sistema",
      },
      {
        id: 2,
        task_section_name: "Pré Evento",
      },

      {
        id: 3,
        task_section_name: "Dia da Noiva",
      },

      {
        id: 4,
        task_section_name: "Dia do Evento",
      },

      {
        id: 5,
        task_section_name: "Pós Evento",
      },
      {
        id: 6,
        task_section_name: "Fechamento",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("task_sections", null, {});
  },
};
