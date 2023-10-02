const db = require('./db');
const Room = require('../dtos/roomDto');
const RoomInfo = require('../dtos/roomInfoDto');

class RoomService {
	async createRoom(name, uuid) {
		const newRoom = await db.query(
			`insert into "room" (name, uuid)
			values ($1, $2)
			returning id as room_id, name, uuid`,
			[name, uuid],
		);

		return new Room(newRoom.rows[0]);
	}

	async getRoomInfo() {
		const rawRoomInfo = await db.query(`
			select room.id as "room_id", room.uuid, room.name, message.id as message_id, message.content, message.date, "user".username, "user".id as "user_id"
			from room
			left join (
				select distinct on (room_id) t.*
				from message t
				order by room_id, date desc
			) message
			on room.id = message.room_id
			left join "user" on message.user_id = "user".id`);

		const roomInfo = rawRoomInfo.rows.map((info) => new RoomInfo(info));

		return roomInfo;
	}

	async deleteRoom(id) {
		const room = await db.query('delete from room where id = $1', [id]);

		return room.rows[0];
	}
}

module.exports = new RoomService();
