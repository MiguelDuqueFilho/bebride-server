"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "events",
    {
      eventId: DataTypes.INTEGER,
      eventName: DataTypes.STRING,
      eventDescription: DataTypes.STRING,
      eventStart: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      eventFinish: DataTypes.DATE,
      eventTypeId: DataTypes.INTEGER,
      eventStatusId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER
    },
    {}
  );
  Event.associate = function(models) {
    Event.belongsTo(models.EventType, {
      foreignKey: "eventTypeId",
      targetKey: "eventTypeId"
    });
    Event.belongsTo(models.EventStatus, {
      foreignKey: "eventStatusId",
      targetKey: "eventStatusId"
    });
  };
  return Event;
};
