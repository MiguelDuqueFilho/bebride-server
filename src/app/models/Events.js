"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      eventName: DataTypes.STRING,
      eventDescription: DataTypes.STRING,
      eventStart: DataTypes.DATEONLY,
      eventDate: DataTypes.DATEONLY,
      eventFinish: DataTypes.DATEONLY,
      eventTypeId: { type: DataTypes.INTEGER, select: false },
      eventStatusId: { type: DataTypes.INTEGER, select: false },
      addressId: { type: DataTypes.INTEGER, select: false },
      eventFilename: DataTypes.STRING,
      uploadId: DataTypes.INTEGER,
    },
    {}
  );
  Event.associate = function (models) {
    Event.hasMany(models.EventType, {
      sourceKey: "eventTypeId",
      foreignKey: "id",
    });
    Event.hasMany(models.EventStatu, {
      sourceKey: "eventStatusId",
      foreignKey: "id",
    });
  };
  sequelizePaginate.paginate(Event);
  return Event;
};
