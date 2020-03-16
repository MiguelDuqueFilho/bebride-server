"use strict";
const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define(
    "Upload",
    {
      fileName: DataTypes.STRING,
      fileType: DataTypes.STRING,
      filePath: DataTypes.STRING,
      fileSize: DataTypes.INTEGER,
      fileUse: DataTypes.BOOLEAN
    },
    {}
  );
  Upload.associate = function(models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(Upload);
  return Upload;
};
