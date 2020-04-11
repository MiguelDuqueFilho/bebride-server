module.exports.returnsData = (message = "", data = null) => {
  const RespSchema = {
    success: true,
    message,
    data,
  };

  return RespSchema;
};

module.exports.errorHandler = (message, errors = "Sem Detalhes") => {
  let ErrorSchema = {
    success: false,
    message,
    errors,
  };

  if (message.details === "validatedError") {
    ErrorSchema = message;
  }

  if (
    typeof message.name !== "undefined" &&
    message.name.startsWith("Sequelize")
  ) {
    switch (message.name) {
      case "SequelizeConnectionRefusedError":
        ErrorSchema.message = "Banco de dados inativo...";
        break;
      case "SequelizeConnectionError":
        ErrorSchema.message = "Erro de Conecção Banco de dados...";
        break;
      case "SequelizeUniqueConstraintError":
        ErrorSchema.message = message.errors[0].message;
        break;
      default:
        ErrorSchema.message = "default Error Database...";
        if (process.env.NODE_ENV !== "production") {
          ErrorSchema.errors = message;
        } else {
          ErrorSchema.errors = message.name;
        }
    }
  }

  return ErrorSchema;
};

module.exports.errorCodeHandler = (message, errors = "Sem Detalhes") => {
  let ErrorCodeSchema = {
    statusCode: 400,
    message,
    errors,
  };

  if (message.details === "validatedError") {
    ErrorCodeSchema = message;
  }

  if (
    typeof message.name !== "undefined" &&
    message.name.startsWith("Sequelize")
  ) {
    switch (message.name) {
      case "SequelizeConnectionRefusedError":
        ErrorCodeSchema.message = "Banco de dados inativo...";
        break;
      case "SequelizeConnectionError":
        ErrorCodeSchema.message = "Erro de Conecção Banco de dados...";
        break;
      case "SequelizeUniqueConstraintError":
        ErrorCodeSchema.message = message.errors[0].message;
        break;
      default:
        ErrorCodeSchema.message = "default Error Database...";
        if (process.env.NODE_ENV !== "production") {
          ErrorCodeSchema.errors = message;
        } else {
          ErrorCodeSchema.errors = message.name;
        }
    }
  }

  return ErrorCodeSchema;
};
