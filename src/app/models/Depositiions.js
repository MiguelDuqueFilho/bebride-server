"use strict";
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
  return Deposition;
};
