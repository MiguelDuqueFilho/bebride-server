module.exports.existsOrError = function(value, msg) {
  const ErrorSchema = {
    success: false,
    message: msg,
    details: "validatedError"
  };

  if (!value) throw ErrorSchema;
  if (Array.isArray(value) && value.length === 0) throw ErrorSchema;
  if (typeof value === "string" && !value.trim()) throw ErrorSchema;
};

module.exports.notExistsOrError = function(value, msg) {
  const ErrorSchema = {
    success: false,
    message: msg,
    details: "validatedError"
  };

  try {
    this.existsOrError(value, msg);
  } catch (msg) {
    return;
  }
  throw ErrorSchema;
};

module.exports.equalsOrError = function(valueA, valueB, msg) {
  const ErrorSchema = {
    success: false,
    message: msg,
    details: "validatedError"
  };

  if (valueA !== valueB) throw ErrorSchema;
};
