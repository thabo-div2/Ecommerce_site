const express = require("express");
const knex = require("../db/knex");
const auth = require("../middleware/auth");

const router = express.Router();

// Controllers
const AdminController = require("../controllers/AdminController");
// const UserController = require("../controllers/UserController");

router.get("/", async (req, res) => {
	let admin = await knex.select("*").from("admin");

	res.status(200).json({ admin });
});

router.get("/:id", auth, async (req, res) => {
	return AdminController.getSingleAdmin(req, res);
});

router.get("/all-data", auth, async (req, res) => {
	return AdminController.getAllUsers(req, res);
});

router.post("/login", async (req, res) => {
	return AdminController.adminLogin(req, res);
});

// Private Post Method
router.post("/admin-sign-up", auth, async (req, res) => {
	return AdminController.adminRegister(req, res);
});

module.exports = router;
