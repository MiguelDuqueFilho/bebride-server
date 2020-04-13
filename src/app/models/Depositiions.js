"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Deposition = sequelize.define(
    "Deposition",
    {
      eventId: DataTypes.INTEGER,
      depositionTitle: DataTypes.STRING,
      depositionDescription: DataTypes.TEXT,
      depositionUrlphoto: DataTypes.STRING,
      depositionShow: DataTypes.BOOLEAN,
    },
    {}
  );
  Deposition.associate = function (models) {
    Deposition.hasMany(models.Event, {
      sourceKey: "eventId",
      foreignKey: "id",
    });
  };
  sequelizePaginate.paginate(Deposition);
  return Deposition;
};
