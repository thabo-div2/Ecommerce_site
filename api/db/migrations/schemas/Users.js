const userSchema = (table) => {
	table.uuid("id").primary().unique();
	table.string("name").notNullable();
	table.string("surname").notNullable();
	table.string("contact_number").notNullable();
	table.date("birth_date").notNullable();
	table.string("id_num").unique().notNullable();
	table.string("username").unique().notNullable();
	table.string("email").unique().notNullable();
	table.string("password").notNullable();
	table.timestamps(true, true);

	// foreign keys
	table.string("role").notNullable();
};

module.exports = userSchema;
