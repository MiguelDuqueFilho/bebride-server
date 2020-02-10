"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("event_status", [
      {
        event_status_id: 1,
        event_status_name: "Inicial"
      },
      {
        event_status_id: 2,
        event_status_name: "Aguardando Contrato"
      },
      {
        event_status_id: 3,
        event_status_name: "Contratado"
      },
      {
        event_status_id: 4,
        event_status_name: "Em Andamento"
      },
      {
        event_status_id: 5,
        event_status_name: "Pendência"
      },
      {
        event_status_id: 6,
        event_status_name: "Concluído"
      },
      {
        event_status_id: 7,
        event_status_name: "Cancelado"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("event_status", null, {});
  }
};
