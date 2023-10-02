import { observer } from 'mobx-react-lite';
import React from 'react';
import ChatInput from './ChatInput';
import chatState, { MessagesInParts } from '../../../store/chatState';
import Message from './Message';
import Button from '../../../components/Button';
import showNotification from '../../../components/Notification/showNotification';
import '../chat.css';
import { CrossSquareIcon } from '../../../components/Icons';

const onDeleteHandler = () => {
	const errorTitle = 'Error when trying to delete a room';
	const { currentRoom, wsChat } = chatState;

	if (!currentRoom) {
		showNotification(
			{
				type: 'error',
				title: errorTitle,
				description: 'Cannot delete room because none is selected',
			},
			0,
		);
		return;
	}
	if (!wsChat) {
		showNotification(
			{
				type: 'error',
				title: errorTitle,
				description: 'Cannot delete room because wsChat is not set',
			},
			0,
		);
		return;
	}

	const confirm = window.confirm(`Are you sure you want to delete ${currentRoom.name} room?`);
	if (!confirm) return;

	wsChat.deleteRoom(currentRoom);
};

const loadMessagesInParts = (part: number) => (event: any) => {
	const errorTitle = 'Error when trying to load messages';
	const { wsChat, currentRoom, messagesInParts } = chatState;

	if (!currentRoom) {
		showNotification(
			{ type: 'error', title: errorTitle, description: 'Cannot send message because room is not selected' },
			0,
		);
		return;
	}

	const { maxPart } = messagesInParts[currentRoom.id];
	if (part > maxPart || part < 0) return;

	if (!wsChat) {
		showNotification(
			{ type: 'error', title: errorTitle, description: 'Cannot send message because there is no wsChat in chatState' },
			0,
		);
		return;
	}

	wsChat.loadMessages(currentRoom, part);
	event.target.hidden = true;
};
const renderMessageParts = (parts: MessagesInParts['']) => {
	const result = [];
	let part = parts.maxPart;
	while (parts[part]) {
		const messagesCluster = (
			<React.Fragment key={`messages-part-${part}`}>
				{parts[part].map((message) => (
					<Message key={message.id} {...message} />
				))}
				{part > 0 ? <Button onClick={loadMessagesInParts(part - 1)}>Load messages</Button> : null}
			</React.Fragment>
		);

		result.push(messagesCluster);

		part -= 1;
	}

	return result;
};

const getIconColor = () => {
	const header = document.getElementsByClassName('chat__title');

	if (!header.length) {
		return undefined;
	}

	return getComputedStyle(header[0]).getPropertyValue('color');
};

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
	const { messagesInParts, currentRoom } = chatState;

	return currentRoom ? (
		<div className="chat">
			<div className="chat__header">
				<h3 className="chat__title">{currentRoom.name}</h3>
				<Button className="chat__delete-button" onClick={onDeleteHandler} title="Delete room">
					<CrossSquareIcon color={getIconColor()} />
				</Button>
			</div>

			{messagesInParts[currentRoom.id] ? (
				<div className="chat__messages">
					<div className="chat__empty-message"></div>
					{renderMessageParts(messagesInParts[currentRoom.id])}
				</div>
			) : null}
			<ChatInput />
		</div>
	) : (
		<div className="chat">
			<h3 className="chat__title">Room is no selected</h3>
		</div>
	);
};

export default observer(Chat);
