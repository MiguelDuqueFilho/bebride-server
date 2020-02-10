"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventStatus = sequelize.define(
    "event_status",
    {
      eventStatusId: DataTypes.INTEGER,
      eventStatusName: DataTypes.STRING
    },
    {}
  );
  EventStatus.associate = function(models) {
    // associations can be defined here
  };
  return EventStatus;
};
