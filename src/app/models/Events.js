"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      eventName: DataTypes.STRING,
      eventDescription: DataTypes.STRING,
      eventStart: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      eventFinish: DataTypes.DATE,
      eventTypeId: { type: DataTypes.INTEGER, select: false },
      eventStatusId: { type: DataTypes.INTEGER, select: false },
      addressId: { type: DataTypes.INTEGER, select: false }
    },
    {}
  );
  Event.associate = function(models) {
    Event.hasMany(models.EventType, {
      sourceKey: "eventTypeId",
      foreignKey: "id"
    });
    Event.hasMany(models.EventStatu, {
      sourceKey: "eventStatusId",
      foreignKey: "id"
    });
  };
  return Event;
};
