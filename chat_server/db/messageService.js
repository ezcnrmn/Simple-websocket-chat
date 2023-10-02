const db = require('./db');
const Message = require('../dtos/messageDto');

const PART_SIZE = 25;

class MessageService {
	async createMessage({ content, date, authorId, roomId }) {
		const rawMessages = await db.query(
			`with inserted as(
				insert into "message" (content, date, user_id, room_id) values ($1, $2, $3, $4) returning *
				) select inserted.id as message_id, inserted.content, inserted.date, inserted.user_id, "user".username
				from inserted
				left join "user"
				on inserted.user_id = "user".id`,
			[content, date, authorId, roomId],
		);

		const rawMessage = rawMessages.rows[0];

		const message = new Message(rawMessage);

		return message;
	}

	async countMessages(roomId) {
		const amount = await db.query(`select count(*) from message where room_id = $1`, [roomId]);

		return { amount: +amount.rows[0].count, size: PART_SIZE };
	}

	async getMessagesWithOffset(roomId, size, offset) {
		const rawMessages = await db.query(
			`select message.id as message_id, message.content, message.date, "user".id as user_id, username
			from message
			left join "user"
			on message.user_id = "user".id
			where room_id = $1
			order by date desc
			limit ${size}
			offset ${offset}`,
			[roomId],
		);

		const messages = rawMessages.rows.map((message) => new Message(message));

		return messages;
	}

	async deleteMessages(roomId) {
		const message = await db.query('delete from "message" where room_id = $1', [roomId]);

		return message;
	}
}

module.exports = new MessageService();
