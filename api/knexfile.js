// Update with your config settings.
const creds = require("./config/creds");

module.exports = {
	development: {
		client: "pg",
		connection: {
			database: process.env.DATABASE_NAME || creds.DB_DATA,
			user: process.env.POSTGRES_USER || creds.DB_USER,
			password: process.env.POSTGRES_USER_PW || creds.DB_PASS,
			port: process.env.POSTGRES_PORT || creds.DB_PORT,
			host: process.env.POSTGRES_HOST || creds.DB_HOST,
		},
		migrations: {
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},
	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./db/migrations",
		},
		seeds: {
			directory: "./db/seeds",
		},
	},
};
