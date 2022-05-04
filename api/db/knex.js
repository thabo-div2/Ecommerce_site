const connection =
	require("../knexfile")[process.env.NODE_ENV || "development"];
const knex = require("knex")(connection);

module.exports = knex;
