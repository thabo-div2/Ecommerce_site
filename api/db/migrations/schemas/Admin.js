const adminSchema = (table) => {
	table.uuid("id").primary().unique();
	table
		.uuid("user_id")
		.references("id")
		.inTable("users")
		.onDelete("CASCADE")
		.onUpdate("CASCADE");
	table.timestamps(true, true);
};

module.exports = adminSchema;
