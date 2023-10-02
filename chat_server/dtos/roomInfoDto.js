const Message = require('./messageDto');
const Room = require('./roomDto');

class RoomInfo {
	room;
	lastMessage;

	constructor({ room_id, name, uuid, message_id, content, date, user_id, username }) {
		this.room = new Room({ room_id, name, uuid });
		this.lastMessage = message_id ? new Message({ message_id, content, date, user_id, username }) : null;
	}
}

module.exports = RoomInfo;
