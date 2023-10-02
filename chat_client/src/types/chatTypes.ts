export interface User {
	id: string;
	username: string;
}

export interface Message {
	id?: string;
	content: string;
	author: User;
	date?: string;
}

export interface Room {
	id: string;
	name: string;
	uuid?: string;
}
export interface RoomInfo {
	room: Room;
	lastMessage: Message | null;
}

interface wsUser {
	type: 'user';
	userId: User['id'];
}
interface wsRoomSelection {
	type: 'room-selection';
	roomId: Room['id'];
}
interface wsNewMessage {
	type: 'new-message';
	room: Room;
	message: Message;
}
interface wsLoadMessages {
	type: 'load-messages';
	roomId: Room['id'];
	part: number;
}
interface wsRoomCreation {
	type: 'room-creation';
	roomName: Room['name'];
}
interface wsRoomRemove {
	type: 'room-remove';
	roomId: Room['id'];
}

export type wsSentMessage = wsUser | wsRoomSelection | wsNewMessage | wsRoomCreation | wsRoomRemove | wsLoadMessages;

interface wsChatHistory {
	type: 'chat-history';
	roomId: Room['id'];
	messages: Message[];
	part: number;
	maxPart: number;
}
interface wsRoomInfo {
	type: 'room-info';
	roomInfo: RoomInfo[];
}
interface wsError {
	type: 'error';
	reason: string;
}
interface wsRefresh {
	type: 'refresh-token';
}
export type wsReceivedMessage = wsRoomInfo | wsChatHistory | wsNewMessage | wsError | wsRefresh;
