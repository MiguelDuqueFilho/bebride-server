"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventTypes = sequelize.define(
    "event_types",
    {
      eventTypeId: DataTypes.INTEGER,
      eventTypeName: DataTypes.STRING
    },
    {}
  );
  EventTypes.associate = function(models) {
    // associations can be defined here
  };
  return EventTypes;
};
