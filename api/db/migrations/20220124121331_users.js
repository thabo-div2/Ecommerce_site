exports.up = function (knex) {
	return knex.schema
		.createTable("users", require("./schemas/Users"))
		.createTable("products", require("./schemas/Products"))
		.createTable("admin", require("./schemas/Admin"))
		.createTable("customer", require("./schemas/Customer"))
		.createTable("orders", require("./schemas/Order"));
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("orders")
		.dropTableIfExists("customer")
		.dropTableIfExists("admin")
		.dropTableIfExists("products")
		.dropTableIfExists("users");
};
