const { Model } = require("objection");

class Admin extends Model {
	static get tableName() {
		return "admin";
	}
	static get jsonSchema() {
		return {
			type: "object",
			required: [
				"name",
				"surname",
				"contact_number",
				"birth_date",
				"id_num",
				"username",
				"email",
				"password",
			],
			properties: {
				id: {
					type: "string",
					format: "uuid",
				},
				name: { type: "string", minLength: 1, maxLength: 255 },
				surname: { type: "string", minLength: 1, maxLength: 255 },
				contact_number: { type: "string", minLength: 1, maxLength: 11 },
				birth_date: { type: "date", minLength: 1, maxLength: 255 },
				id_num: { type: "string", minLength: 1, maxLength: 14 },
				username: { type: "string", minLength: 1, maxLength: 255 },
				email: { type: "string", minLength: 1, maxLength: 255 },
				password: { type: "string", minLength: 6, maxLength: 15 },
				createdAt: { type: "string" },
				updatedAt: { type: "string" },
			},
		};
	}
}

module.exports = Admin;
