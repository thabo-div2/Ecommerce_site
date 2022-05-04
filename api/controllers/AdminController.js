const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validationResult } = require("express-validator");
const config = require("config");
const creds = require("../config/creds");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(password);
		let user = await knex
			.select()
			.from("users")
			.where("email", email)
			.then((user) => {
				console.log(user[0]);
				return user[0];
			});
		console.log(user.password);
		const isMatch = await bcrypt.compare(password, user.password);
		console.log(isMatch);
		if (!isMatch) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password",
			});
		}

		if (user.role === "admin") {
			const payload = {
				admin: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 400000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				},
			);
		} else {
			res.status(400).json({ err: "Not a admin" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
};

const adminRegister = async (req, res) => {
	const info = req.header("x-auth-token");
	const decoded = jwt.verify(info, config.get("jwtSecret"));
	console.log(decoded);
	const userId = decoded.admin.id;
	console.log(userId);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		let user = await knex
			.select()
			.from("users")
			.where("id", userId)
			.then((admin) => {
				return admin[0];
			});
		if (user.role !== "admin") {
			res.status(400).send({ msg: "Not an admin" });
		}

		let emailMatching = await knex
			.select()
			.from("users")
			.where("email", req.body.email)
			.then((user) => {
				return user[0];
			});
		if (emailMatching) {
			res.status(400).send({ msg: "Email is already in use" });
		} else {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hashSync(req.body.password, salt);
			knex("users")
				.insert({
					id: v4(),
					name: req.body.name,
					surname: req.body.surname,
					contact_number: req.body.contact_number,
					birth_date: req.body.birth_date,
					id_num: req.body.id_num,
					username: req.body.username,
					email: req.body.email,
					password: hash,
					role: "admin",
				})
				.returning(["*"])
				.then((user) => {
					const userInfo = user[0];
					if (userInfo.role === "admin") {
						knex(`${userInfo.role}`)
							.insert({
								id: v4(),
								user_id: userInfo.id,
							})
							.then((admin) => {
								res.status(201).json({ admin: admin, user: userInfo });
							});
					}
				});
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const getSingleAdmin = async (req, res) => {
	const info = req.header("x-auth-token");
	const decoded = jwt.verify(info, config.get("jwtSecret"));
	const userId = decoded.admin.id;
	console.log(userId);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let admin = await knex
			.select()
			.from("admin")
			.where("id", req.params.id)
			.then((admin) => {
				return admin;
			});
		console.log(admin);

		if (admin[0].id == userId) {
			return res.status(200).json({ admin: admin });
		} else {
			return res.status(400).json({ msg: "not an admin" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
};

const getAllUsers = async (res, req) => {
	const info = req.header("x-auth-token");
	const decoded = jwt.verify(info, config.get("jwtSecret"));
	const adminId = decoded.admin.id;
	console.log(adminId);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let admin = await knex
			.select()
			.from("admin")
			.where("id", adminId)
			.then((admin) => {
				return admin;
			});
		console.log(admin);

		if (admin.isEmpty()) {
			knex("users").then((user) => res.status(200).json(user));
		} else {
			res.status(401).res.json("Not an admin");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json("Server Error");
	}
};

const deleteAdmin = async (req, res) => {};

const updateAdmin = async (req, res) => {};

module.exports = {
	adminLogin,
	adminRegister,
	getSingleAdmin,
	getAllUsers,
};
