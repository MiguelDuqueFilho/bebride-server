module.exports.returnsData = (message = "", data = null) => {
  const RespSchema = {
    success: true,
    message,
    data
  };

  return RespSchema;
};

module.exports.errorHandler = (message, errors = "Sem Detalhes") => {
  let ErrorSchema = {
    success: false,
    message,
    errors
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

// const _ = require("lodash");

// module.exports = (err, req, res, next) => {
//   console.log(`>> err in err.message =  ${err.message}`);
//   console.log(`>> err in err.message.name  =  ${err.message.name}`);
//   // const bundle = res.locals.bundle;
//   // if (bundle.errors) {
//   //   const errors = parserErrors(bundle.errors);
//   //   res.status(500).json({ errors });
//   // } else {
//   console.log(`>> ErrorHandle xx next() =  ${err.statusCode}`);
//   next(err);
// };

// const parserErrors = nodeRestfullErrors => {
//   const errors = [];
//   // filtrar erros
//   _.forIn(nodeRestfullErrors, error => errors.push(errors.message));

//   errors = nodeRestfullErrors;
//   //
//   console.log(`>> ErrorHandle in bundle.errors =  ${errors}`);

//   return errors;
// };
