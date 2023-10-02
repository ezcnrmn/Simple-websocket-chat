const db = require('./db');

class UserService {
	async findByUsername(username) {
		const result = await db.query('select id, username, password from "user" where username = $1', [username]);

		return result.rows[0];
	}

	async createUser(username, password) {
		const result = await db.query('insert into "user" (username, password) values ($1, $2) returning id, username', [
			username,
			password,
		]);

		return result.rows[0];
	}
}

module.exports = new UserService();
