import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import chatState from '../../../store/chatState';
import { Room } from '../../../types/chatTypes';
import RoomPreview from './RoomPreview';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Details from '../../../components/Details';
import showNotification from '../../../components/Notification/showNotification';
import '../chat.css';

const errorTitle = 'Error when trying to select a room';

interface RoomListProps {}

const roomSelectHandler = (room: Room) => () => {
	const { wsChat, currentRoom } = chatState;

	if (currentRoom?.id === room.id) return;

	chatState.setCurrentRoom(room);

	if (!wsChat) {
		showNotification(
			{
				type: 'error',
				title: errorTitle,
				description: 'Cannot send message because there is no wsChat in chatState',
			},
			0,
		);
		return;
	}

	wsChat.selectRoom(room);
};

const RoomList: React.FC<RoomListProps> = () => {
	const { roomInfo } = chatState;
	const [newRoomName, setNewRoomName] = useState('');

	const createRoomHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!newRoomName) return;

		if (!chatState.wsChat) {
			showNotification(
				{
					type: 'error',
					title: errorTitle,
					description: 'Cannot send message because there is no wsChat in chatState',
				},
				0,
			);
			return;
		}

		chatState.wsChat.createRoom(newRoomName);

		setNewRoomName('');
	};

	return (
		<div className="room-list">
			<div className="room-list__header"></div>
			{roomInfo.map((info) => (
				<RoomPreview key={info.room.id} roomInfo={info} roomSelectHandler={roomSelectHandler} />
			))}
			<Details title="Create room">
				<Input className="create-room__input" value={newRoomName} setValue={setNewRoomName} label="name" />
				<Button className="create-room__button" onClick={createRoomHandler} pressable>
					Create
				</Button>
			</Details>
		</div>
	);
};

export default observer(RoomList);
