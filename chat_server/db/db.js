const config = require('../config');
const Pool = require('pg').Pool;

const pool = new Pool({
	user: config.DB_USER,
	password: config.DB_PASSWORD,
	host: config.DB_HOST,
	port: config.DB_PORT,
	database: config.DB_DATABASE,
});

module.exports = pool;
