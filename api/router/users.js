const express = require("express");
const res = require("express/lib/response");
const knex = require("../db/knex");
const auth = require("../middleware/auth");

const router = express.Router();

// Controllers
const UserController = require("../controllers/UserController");

// Public Get Method
router.get("/", async (req, res) => {
	let users = await knex.select("*").from("users");

	res.status(200).json({ users });
});

// Private Get Method
router.get("/:id", auth, (req, res) => {
	return UserController.getSingleUser(req, res);
});

// Public POST Method
router.post("/", (req, res) => {
	return UserController.registerUser(req, res);
});

// Public POST Method
router.post("/login", (req, res) => {
	return UserController.loginUser(req, res);
});

module.exports = router;
