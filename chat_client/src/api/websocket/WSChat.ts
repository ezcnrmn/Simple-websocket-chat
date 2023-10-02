import chatState from '../../store/chatState';
import { Room, User, wsReceivedMessage, wsSentMessage } from '../../types/chatTypes';
import WebSocketWrapper, { onCloseHandler, onErrorHandler, onMessageHandler, onOpenHandler } from './WebSocketWrapper';
import config from '../../../config';
import { TOKEN_STORAGE_KEY, TOKEN_PARAM } from '../../helpers/consts';
import host from '../host';

const wsAddress = `${config.WS_BASE_URL}ws-api/chat/`;

class WSChat extends WebSocketWrapper {
	private onOpenHandler: onOpenHandler | null = null;
	private onCloseHandler: onCloseHandler | null = null;
	private onErrorHandler: onErrorHandler | null = null;
	private onMessageHandler: onMessageHandler | null = null;

	private onOpenChat: onOpenHandler = (event) => {
		if (this.onOpenHandler) this.onOpenHandler(event);

		if (!chatState.currentUser) {
			throw new Error('currentUser is null');
		} else {
			this.sendUserInfo(chatState.currentUser);
		}

		if (chatState.currentRoom) {
			this.selectRoom(chatState.currentRoom);
		}
	};
	private onCloseChat: onCloseHandler = (event) => {
		if (this.onCloseHandler) this.onCloseHandler(event);
	};
	private onErrorChat: onErrorHandler = (event) => {
		if (this.onErrorHandler) this.onErrorHandler(event);
	};
	private onMessageChat: onMessageHandler = async (event) => {
		const message: wsReceivedMessage = JSON.parse(event.data);

		// TODO: trycatch? showNotification({ title: 'Unable to reset access token', type: 'error' }, 0)
		if (message.type === 'refresh-token') {
			this.disconnect();

			const response = await host.get('api/user/refresh');
			localStorage.setItem(TOKEN_STORAGE_KEY, response.data.tokens.accessToken);

			const query = `?${TOKEN_PARAM}=${response.data.tokens.accessToken}`;
			const url = wsAddress + query;

			this.open(url, {
				onopen: this.onOpenChat,
				onclose: this.onCloseChat,
				onerror: this.onErrorChat,
				onmessage: this.onMessageChat,
			});
		}

		if (this.onMessageHandler) this.onMessageHandler(event);
	};

	constructor() {
		super();

		const query = `?${TOKEN_PARAM}=${localStorage.getItem(TOKEN_STORAGE_KEY)}`;

		const url = wsAddress + query;

		this.open(url, {
			onopen: this.onOpenChat,
			onclose: this.onCloseChat,
			onerror: this.onErrorChat,
			onmessage: this.onMessageChat,
		});
	}

	setOnOpenHandler(handler: onOpenHandler) {
		this.onCloseHandler = handler;
	}
	setOnCloseHandler(handler: onCloseHandler) {
		this.onCloseHandler = handler;
	}
	setOnErrorHandler(handler: onErrorHandler) {
		this.onErrorHandler = handler;
	}
	setOnMessageHandler(handler: onMessageHandler) {
		this.onMessageHandler = handler;
	}

	loadMessages(room: Room, part: number) {
		const message: wsSentMessage = {
			type: 'load-messages',
			roomId: room.id,
			part,
		};

		this.send(message);
	}

	sendMessage(room: Room, user: User, content: string) {
		const newMessage: wsSentMessage = {
			type: 'new-message',
			room,
			message: {
				author: user,
				content,
			},
		};

		this.send(newMessage);
	}

	sendUserInfo(user: User) {
		const message: wsSentMessage = {
			type: 'user',
			userId: user.id,
		};

		this.send(message);
	}

	createRoom(roomName: Room['name']) {
		const message: wsSentMessage = {
			type: 'room-creation',
			roomName,
		};

		this.send(message);
	}
	selectRoom(room: Room) {
		const message: wsSentMessage = {
			type: 'room-selection',
			roomId: room.id,
		};

		this.send(message);
	}
	deleteRoom(room: Room) {
		const message: wsSentMessage = {
			type: 'room-remove',
			roomId: room.id,
		};

		this.send(message);
	}

	disconnect() {
		this.close();
	}
}

export default WSChat;
