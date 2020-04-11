const { mode } = require("../../config/config");
const { isCelebrate } = require("celebrate");
const EscapeHtml = require("escape-html");

// module.exports.errorHandler = (message, errors = "Sem Detalhes") => {
//   let ErrorSchema = {
//     success: false,
//     message,
//     errors,
//   };

//   if (message.details === "validatedError") {
//     ErrorSchema = message;
//   }

//   if (
//     typeof message.name !== "undefined" &&
//     message.name.startsWith("Sequelize")
//   ) {
//     switch (message.name) {
//       case "SequelizeConnectionRefusedError":
//         ErrorSchema.message = "Banco de dados inativo...";
//         break;
//       case "SequelizeConnectionError":
//         ErrorSchema.message = "Erro de Conecção Banco de dados...";
//         break;
//       case "SequelizeUniqueConstraintError":
//         ErrorSchema.message = message.errors[0].message;
//         break;
//       default:
//         ErrorSchema.message = "default Error Database...";
//         if (process.env.NODE_ENV !== "production") {
//           ErrorSchema.errors = message;
//         } else {
//           ErrorSchema.errors = message.name;
//         }
//     }
//   }

//   return ErrorSchema;
// };

module.exports = (err, req, res, next) => {
  if (mode !== "production") {
    var m = new Date();
    const dateString = `${m.getFullYear()}/${
      m.getMonth() + 1
    } ${m.getDate()} ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log(
      `>> Time: ${dateString} -- Error: ${err} -- isCelebrate: ${
        isCelebrate(err) ? true : false
      }`
    );
  }

  // If this isn't a Celebrate error, send it to the next error handler
  if (!isCelebrate(err)) {
    return next(err);
  }

  const { joi, meta } = err;

  const result = {
    statusCode: 400,
    error: "Bad Request",
    message: joi.message,
    validation: {
      source: meta.source,
      keys: [],
    },
  };

  if (joi.details) {
    for (let i = 0; i < joi.details.length; i += 1) {
      const path = joi.details[i].path.join(".");
      result.validation.keys.push(EscapeHtml(path));
    }
  }
  return res.status(400).send(result);
};

// const { AssertionError } = require("assert");
// const { MongoError } = require("mongodb");

// app.use(function handleAssertionError(error, req, res, next) {
//   if (error instanceof AssertionError) {
//     return res.status(400).json({
//       type: "AssertionError",
//       message: error.message,
//     });
//   }
//   next(error);
// });

// app.use(function handleDatabaseError(error, req, res, next) {
//   if (error instanceof MongoError) {
//     return res.status(503).json({
//       type: "MongoError",
//       message: error.message,
//     });
//   }
//   next(error);
// });
