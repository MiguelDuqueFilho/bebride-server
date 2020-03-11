"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("depositions", [
      {
        event_id: 1,
        deposition_title: "Assessoria incrivel",
        deposition_description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique consequatur cumque provident, dolorem quis autem exercitationem! Neque, modi nihil.",
        deposition_urlphoto: "/src/assets/img/depositions/deposition_0.jpg",
        deposition_show: false
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("depositions", null, {});
  }
};
