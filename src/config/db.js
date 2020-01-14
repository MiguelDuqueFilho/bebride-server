const { mode } = require("./config");
const config = require("../../knexfile")[mode];
const knexStringcase = require("knex-stringcase");
const options = knexStringcase(config);
const knex = require("knex")(options);

module.exports = knex;
