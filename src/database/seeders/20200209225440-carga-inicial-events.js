"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("events", [
      {
        id: 1,
        event_name: "Casamento de Gilberto e Priscila",
        event_description:
          "Descrição do evento do Casamento de Gilberto e Priscila",
        event_start: "2020-03-01",
        event_date: "2020-03-01",
        event_finish: "2020-03-01",
        event_type_id: 1,
        event_status_id: 1,
        address_id: null
      },
      {
        id: 2,
        event_name: "Casamento de Maria e João",
        event_description: "Descrição do evento do Casamento de Maria e João",
        event_start: "2020-03-01",
        event_date: "2020-03-01",
        event_finish: "2020-03-01",
        event_type_id: 2,
        event_status_id: 2,
        address_id: null
      },
      {
        id: 3,
        event_name: "Casamento de Sabrina e Luiza",
        event_description:
          "Descrição do evento do Casamento de Sabrina e Luiza",
        event_start: "2020-03-01",
        event_date: "2020-03-01",
        event_finish: "2020-03-01",
        event_type_id: 3,
        event_status_id: 3,
        address_id: null
      },
      {
        id: 4,
        event_name: "Casamento de Marcio e Felipe",
        event_description:
          "Descrição do evento do Casamento de Marcio e Felipe",
        event_start: "2020-03-01",
        event_date: "2020-03-01",
        event_finish: "2020-03-01",
        event_type_id: 4,
        event_status_id: 4,
        address_id: null
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  }
};
