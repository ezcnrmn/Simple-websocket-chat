const express = require('express');
const router = express.Router();

const { v4: uuid } = require('uuid');

const MessageService = require('../db/messageService');
const RoomService = require('../db/roomService');

const time = require('../helpers/time');
const { WS_CHAT_HISTORY_TYPE, WS_ROOM_INFO_TYPE, WS_ERROR_TYPE, WS_REFRESH_TYPE } = require('../helpers/consts');

const ApiError = require('../exceptions/apiError');

const { verifyAccessToken } = require('../helpers/token');

const clients = {};

//

const broadcast = (message) => {
	Object.entries(clients).map(([_, { ws }]) => {
		ws.send(JSON.stringify(message));
	});
};
const broadcastByRoomId = (id, message) => {
	Object.entries(clients).map(([_, { roomId, ws }]) => {
		roomId === id && ws.send(JSON.stringify(message));
	});
};

const loadChatHistory = async (ws, roomId, part = null) => {
	if (part < 0) {
		throw ApiError.InternalError('Negative indexes are not allowed');
		// ws.send(JSON.stringify({ type: 'error', reason: 'Negative indexes are not allowed' }));
		// return;
	}

	const { amount, size } = await MessageService.countMessages(roomId);

	const maxPart = Math.ceil(amount / size) - 1;
	const requestedPart = part ?? maxPart;

	const lastPartSize = amount % size === 0 ? size : amount % size;

	const partSize = requestedPart === maxPart ? lastPartSize : size;
	const partOffset = requestedPart === maxPart ? 0 : size * (maxPart - requestedPart - 1) + lastPartSize;

	const messages = await MessageService.getMessagesWithOffset(roomId, partSize, partOffset);

	return {
		type: WS_CHAT_HISTORY_TYPE,
		part: requestedPart,
		roomId,
		messages,
		maxPart,
	};
};

//

const connectionHandler = async (ws, message, id) => {
	clients[id].userId = message.userId;

	const roomInfo = await RoomService.getRoomInfo();

	ws.send(JSON.stringify({ type: WS_ROOM_INFO_TYPE, roomInfo }));
};

const roomCreationHandler = async (ws, message, id) => {
	const { roomName } = message;

	const room = await RoomService.createRoom(roomName, uuid());

	const roomInfo = await RoomService.getRoomInfo();
	broadcast({ type: WS_ROOM_INFO_TYPE, roomInfo });
};
const roomRemoveHandler = async (ws, message, id) => {
	const { roomId } = message;

	await MessageService.deleteMessages(roomId);
	await RoomService.deleteRoom(roomId);

	const roomInfo = await RoomService.getRoomInfo();
	broadcast({ type: WS_ROOM_INFO_TYPE, roomInfo });

	Object.values(clients).forEach((client) => (client.roomId === roomId ? (client.roomId = null) : null));
};
const roomSelectionHandler = async (ws, message, id) => {
	const { roomId } = message;

	clients[id].roomId = roomId;

	const history = await loadChatHistory(ws, roomId);

	ws.send(JSON.stringify(history));
};

const messageHandler = async (ws, wsmessage) => {
	const { room, message } = wsmessage;

	const newMessage = {
		content: message.content,
		date: time.timestampToString(Date.now()),
		authorId: message.author.id,
		roomId: room.id,
	};

	await MessageService.createMessage(newMessage);

	const history = await loadChatHistory(ws, room.id);
	broadcastByRoomId(room.id, history);

	const roomInfo = await RoomService.getRoomInfo();
	broadcast({ type: WS_ROOM_INFO_TYPE, roomInfo });
};

const messagePartsHandler = async (ws, wsmessage) => {
	const { roomId, part } = wsmessage;

	const history = await loadChatHistory(ws, roomId, part);

	ws.send(JSON.stringify(history));
};

const deleteClient = (id) => {
	delete clients[id];
	console.log(`Client is deleted ${id}`);
};

router.ws('/chat', (ws, req, next) => {
	const id = uuid();
	clients[id] = { userId: null, ws, roomId: null, timeoutId: null };
	console.log(`New client ${id}`);

	ws.on('close', () => {
		deleteClient(id);
	});

	ws.on('message', async (message) => {
		console.log('onmessage', message);

		const token = req.query.token;

		if (!token) {
			ws.send(JSON.stringify({ type: WS_ERROR_TYPE, reason: 'Token missing' }));
			ws.close();
			return;
		}

		const user = verifyAccessToken(token);

		if (!user) {
			ws.send(JSON.stringify({ type: WS_REFRESH_TYPE }));
			ws.close();
			return;
		}

		clients[id].timeoutId = setTimeout(() => {
			ws.send(JSON.stringify({ type: WS_REFRESH_TYPE }));
			ws.close();
		}, new Date(user.exp * 1000) - Date.now());

		message = JSON.parse(message);

		try {
			switch (message.type) {
				case 'user':
					await connectionHandler(ws, message, id);
					break;

				case 'room-creation':
					await roomCreationHandler(ws, message, id);
					break;
				case 'room-remove':
					await roomRemoveHandler(ws, message, id);
					break;
				case 'room-selection':
					await roomSelectionHandler(ws, message, id);
					break;

				case 'new-message':
					await messageHandler(ws, message);
					break;
				case 'load-messages':
					await messagePartsHandler(ws, message);
					break;

				default:
					throw ApiError.InternalError('Wrong query');
			}
		} catch (error) {
			next(error);
		}
	});
});

module.exports = router;
