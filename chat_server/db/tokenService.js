const db = require('./db');

class TokenService {
	async createRecord(userId) {
		const newTokenRecord = await db.query('insert into token (user_id) values ($1) returning *', [userId]);
		return newTokenRecord.rows[0];
	}

	async saveToken(userId, refreshToken) {
		const token = await db.query('update token set refresh_token = $1 where user_id = $2 returning *', [
			refreshToken,
			userId,
		]);

		return token.rows[0];
	}

	async eraseToken(userId, refreshToken) {
		// const token = await db.query('delete from token where user_id = $1 and refresh_token= $2', [userId, refreshToken]);
		const token = await db.query(
			'update token set refresh_token = $1 where user_id = $2 and refresh_token= $3 returning *',
			['', userId, refreshToken],
		);

		return token.rows[0];
	}

	async isExist(userId, refreshToken) {
		const token = await db.query('select * from token where user_id = $1 and refresh_token= $2', [
			userId,
			refreshToken,
		]);

		return !!token.rows[0];
	}
}

module.exports = new TokenService();
