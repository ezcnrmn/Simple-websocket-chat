import React, { useState } from 'react';
import chatState from '../../../store/chatState';
import Button from '../../../components/Button';
import showNotification from '../../../components/Notification/showNotification';
import '../chat.css';
import TextArea from '../../../components/TextArea';

const sendMessage = (text: string) => {
	const errorTitle = 'Error when trying to send a message';
	const { wsChat, currentRoom, currentUser } = chatState;
	if (!wsChat) {
		showNotification(
			{ type: 'error', title: errorTitle, description: 'Cannot send message because there is no wsChat in chatState' },
			0,
		);
		return;
	}
	if (!currentRoom) {
		showNotification(
			{ type: 'error', title: errorTitle, description: 'Cannot send message because room is not selected' },
			0,
		);
		return;
	}
	if (!currentUser) {
		showNotification(
			{
				type: 'error',
				title: errorTitle,
				description: 'Cannot send message because there is no currentUser in chatState',
			},
			0,
		);
		return;
	}

	wsChat.sendMessage(currentRoom, currentUser, text);
};

const ChatInput: React.FC = () => {
	const [text, setText] = useState('');

	const onEnterHandler = (event: React.KeyboardEvent) => {
		if (event.shiftKey) return;
		else if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			event.preventDefault();

			if (text) {
				sendMessage(text);
				setText('');
			}
		}
	};
	const onSendHandler = () => {
		if (text) {
			sendMessage(text);
			setText('');
		}
	};

	return (
		<div className="chat-input">
			<TextArea
				className="chat-input__textarea"
				value={text}
				onChange={(event: any) => setText(event.target.value)}
				onKeyDown={onEnterHandler}
				placeholder="Write here..."
			/>
			<Button className="chat-input__button" onClick={onSendHandler} pressable>
				Send
			</Button>
		</div>
	);
};

export default ChatInput;
