"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("downloads", [
      {
        id: 1,
        download_title: "Plano Modelo",
        download_description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        download_filename: "modelo.pdf",
        download_show: true
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("downloads", null, {});
  }
};
