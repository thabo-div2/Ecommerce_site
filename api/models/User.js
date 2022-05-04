const { Model } = require("objection");

class User extends Model {
	static get tableName() {
		return "users";
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
				birth_date: { type: "date" },
				id_num: { type: "string", minLength: 1, maxLength: 14 },
				username: { type: "string", minLength: 1, maxLength: 255 },
				email: { type: "string" },
				password: { type: "string" },
				createdAt: { type: "string" },
				updatedAt: { type: "string" },
			},
		};
	}
}

module.exports = User;
