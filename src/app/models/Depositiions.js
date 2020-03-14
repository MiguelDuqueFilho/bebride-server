"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Deposition = sequelize.define(
    "Deposition",
    {
      EventId: DataTypes.INTEGER,
      depositionTitle: DataTypes.STRING,
      depositionDescription: DataTypes.TEXT,
      depositionUrlphoto: DataTypes.STRING,
      depositionShow: DataTypes.BOOLEAN
    },
    {}
  );
  Deposition.associate = function(models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(Deposition);
  return Deposition;
};
