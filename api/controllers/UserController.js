const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validationResult } = require("express-validator");
const config = require("config");
const creds = require("../config/creds");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const registerUser = async (req, res) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	try {
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
				role: req.body.role,
			})
			.returning(["*"])
			.then((user) => {
				console.log(user[0]);
				const userInfo = user[0];
				console.log(userInfo, userInfo.role);
				if (userInfo.role === "customer") {
					knex(`${userInfo.role}`)
						.insert({
							id: v4(),
							user_id: userInfo.id,
						})
						.returning(["*"])
						.then((customer) => {
							res.status(201).json({ customer: customer, user: user });
						});
				}
			});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await knex
			.select()
			.from("users")
			.where("email", email)
			.then((user) => {
				console.log(user[0]);
				return user[0];
			});
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password",
			});
		}
		const payload = {
			user: {
				id: user.id,
				name: user.name,
				surname: user.surname,
				contact_number: user.contact_number,
				role: user.role,
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
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const getSingleUser = async (req, res) => {
	const info = req.header("x-auth-token");
	const decoded = jwt.verify(info, config.get("jwtSecret"));
	const userId = decoded.user.id;
	console.log(userId);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let user = await knex
			.select()
			.from("users")
			.where("id", req.params.id)
			.then((user) => {
				return user;
			});
		console.log(user);
		if (user[0].id == userId) {
			return res.status(200).json({ user: user });
		} else {
			return res.status(400).json({ msg: "not the right user" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
	registerUser,
	loginUser,
	getSingleUser,
};
