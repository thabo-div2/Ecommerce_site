const { Model } = require("objection");

class Product extends Model {
	static get tableName() {
		return "products";
	}
	static get jsonSchema() {
		return {
			type: "object",
			required: ["name", "description", "price", "stock"],
			properties: {
				id: {
					type: "string",
					format: "uuid",
				},
				name: { type: "string", minLength: 1, maxLength: 255 },
				description: { type: "string", minLength: 1, maxLength: 255 },
				price: { type: "string", minLength: 1, maxLength: 11 },
				stock: { type: "string", minLength: 1, maxLength: 255 },
			},
		};
	}
}

module.exports = Product;
