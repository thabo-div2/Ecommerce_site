const orderSchema = (table) => {
	table.uuid("id").primary().unique();
	table
		.uuid("user_id")
		.references("id")
		.inTable("users")
		.onDelete("CASCADE")
		.onUpdate("CASCADE");
	table
		.uuid("product_id")
		.references("id")
		.inTable("products")
		.onDelete("CASCADE")
		.onUpdate("CASCADE");
	table.integer("quantity").notNullable();
	table.integer("total_price").notNullable();
};

module.exports = orderSchema;
