module.exports.existsOrError = function(value, msg) {
  if (!value) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === "string" && !value.trim()) throw msg;
};

module.exports.notExistsOrError = function(value, msg) {
  try {
    this.existsOrError(value, msg);
  } catch (msg) {
    return;
  }
  throw msg;
};

module.exports.equalsOrError = function(valueA, valueB, msg) {
  if (valueA !== valueB) throw msg;
};
