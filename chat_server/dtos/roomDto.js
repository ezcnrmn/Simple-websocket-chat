class Room {
	id;
	name;
	uuid;

	constructor({ room_id, name, uuid }) {
		this.id = room_id;
		this.name = name;
		this.uuid = uuid;
	}
}

module.exports = Room;
