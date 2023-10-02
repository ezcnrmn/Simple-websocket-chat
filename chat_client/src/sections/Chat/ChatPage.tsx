import React, { useEffect } from 'react';
import Chat from './components/Chat';
import RoomList from './components/RoomList';
import { wsReceivedMessage } from '../../types/chatTypes';
import chatState from '../../store/chatState';
import WSChat from '../../api/websocket/WSChat';
import showNotification from '../../components/Notification/showNotification';
import { useNavigate } from 'react-router-dom';
import './chat.css';

const onMessage = (event: MessageEvent) => {
	const message: wsReceivedMessage = JSON.parse(event.data);
	console.log('onMessage', message);

	switch (message.type) {
		case 'room-info':
			chatState.setRoomInfo(message.roomInfo);
			break;
		case 'chat-history':
			chatState.setMessages({
				// roomId: message.roomId,
				// messages: message.messages,
				// part: message.part,
				// maxPart: message.maxPart,
				...message,
			});
			break;
		case 'new-message': {
			const { room, message: newMessage } = message;

			// chatState.pushMessage(room.id, newMessage);

			if (chatState.currentRoom?.id !== room.id) {
				showNotification(
					{
						type: 'info',
						title: room.name,
						description: `${newMessage.author.username}: ${newMessage.content}`,
					},
					3000,
				);
			}

			break;
		}

		case 'error':
			showNotification({ type: 'error', title: 'WebSocket error', description: message.reason }, 0);
			break;

		case 'refresh-token':
			break;

		default:
			showNotification({ type: 'error', title: 'Unknown message type', description: message }, 5000);
	}
};

const ChatPage: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!chatState.isAuthorizated) navigate('/');

		document.title = 'Chatrooms';

		const wschat = new WSChat();
		wschat.setOnMessageHandler(onMessage);

		chatState.setWSChat(wschat);

		return () => {
			wschat.disconnect();
			chatState.setWSChat(null);
		};
	}, []);

	return (
		<div className="chat-page">
			<RoomList />
			<Chat />
		</div>
	);
};

export default ChatPage;
