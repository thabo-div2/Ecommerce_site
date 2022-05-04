const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("words4321", salt);

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{
					id: v4(),
					name: "Thabo",
					surname: "Setsubi",
					contact_number: "1234567890",
					birth_date: "1996-06-30",
					id_num: "1234567890",
					username: "thabo",
					email: "thabo@test.com",
					password: hash,
					role: "customer",
				},
				{
					id: v4(),
					name: "admin",
					surname: "admin",
					contact_number: "1234567890",
					birth_date: "1997-06-30",
					id_num: "1234567110",
					username: "admin",
					email: "admin@test.com",
					password: hash,
					role: "admin",
				},
			]);
		});
};
