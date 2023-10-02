class User {
	id;
	username;

	constructor({ user_id, username }) {
		this.id = user_id;
		this.username = username;
	}
}

module.exports = User;
