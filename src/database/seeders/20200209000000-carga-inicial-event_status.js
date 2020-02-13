"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("event_status", [
      {
        id: 1,
        event_status_name: "Inicial"
      },
      {
        id: 2,
        event_status_name: "Aguardando Contrato"
      },
      {
        id: 3,
        event_status_name: "Contratado"
      },
      {
        id: 4,
        event_status_name: "Em Andamento"
      },
      {
        id: 5,
        event_status_name: "Pendência"
      },
      {
        id: 6,
        event_status_name: "Concluído"
      },
      {
        id: 7,
        event_status_name: "Cancelado"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("event_status", null, {});
  }
};
