const express = require("express");
const knex = require("../db/knex");

const router = express.Router();

router.get("/", async (req, res) => {
	let products = await knex.select("*").from("products");

	res.status(200).json({ products });
});

module.exports = router;
