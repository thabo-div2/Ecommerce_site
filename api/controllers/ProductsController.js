const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validationResult } = require("express-validator");
const config = require("config");
const creds = require("../config/creds");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const getAllProducts = async (req, res) => {};

const getSingleProduct = async (req, res) => {};

const createProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};

module.exports = {
	getAllProducts,
	createProduct,
	getSingleProduct,
	deleteProduct,
	updateProduct,
};
