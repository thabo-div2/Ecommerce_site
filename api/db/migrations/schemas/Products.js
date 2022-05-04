const productSchema = (table) => {
	table.uuid("id").primary().unique();
	table.string("name").notNullable();
	table.string("description").notNullable();
	table.string("price").notNullable();
	table.string("stock").notNullable();
};

module.exports = productSchema;
