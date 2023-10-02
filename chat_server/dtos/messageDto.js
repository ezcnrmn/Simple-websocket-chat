const User = require('./userDto');

class Message {
	id;
	content;
	date;
	author;

	constructor({ message_id, content, date, user_id, username }) {
		this.id = message_id;
		this.content = content;
		this.date = date;
		this.author = new User({ user_id, username });
	}
}

module.exports = Message;
