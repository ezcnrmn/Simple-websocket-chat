import { makeAutoObservable } from 'mobx';
import { Message, User, RoomInfo, Room } from '../types/chatTypes';
import WSChat from '../api/websocket/WSChat';

export interface MessagesInParts {
	[roomId: Room['id']]: {
		[part: number]: Message[];
		maxPart: number;
	};
}

class ChatState {
	messagesInParts: MessagesInParts = {};

	currentUser: User | null = null;
	isAuthorizated: boolean = false;

	roomInfo: RoomInfo[] = [];
	currentRoom: Room | null = null;

	wsChat: WSChat | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setMessages({
		roomId,
		messages,
		part,
		maxPart,
	}: {
		roomId: Room['id'];
		messages: Message[];
		part: number;
		maxPart: number;
	}) {
		if (!this.messagesInParts[roomId]) {
			this.messagesInParts[roomId] = {
				maxPart,
			};
		}

		this.messagesInParts[roomId][part] = messages;
		this.messagesInParts[roomId].maxPart = maxPart;
	}

	setRoomInfo(roomInfo: RoomInfo[]) {
		this.roomInfo = roomInfo;

		if (this.currentRoom && !roomInfo.find((info) => info.room.id === this.currentRoom?.id)) {
			this.currentRoom = null;
		}
	}

	setCurrentUser(user: User | null) {
		this.currentUser = user;
		this.isAuthorizated = !!user;
	}
	setCurrentRoom(room: Room | null) {
		this.currentRoom = room;
	}

	setWSChat(wsChat: WSChat | null) {
		this.wsChat = wsChat;
	}
}

export default new ChatState();
