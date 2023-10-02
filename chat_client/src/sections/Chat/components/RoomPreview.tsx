import React from 'react';
import { RoomInfo, Room } from '../../../types/chatTypes';
import '../chat.css';

interface RoomPreviewProps {
	roomInfo: RoomInfo;
	roomSelectHandler: (room: Room) => () => void;
}

const RoomPreview: React.FC<RoomPreviewProps> = ({ roomInfo, roomSelectHandler }) => {
	const { room, lastMessage } = roomInfo;

	return (
		<section className="room-preview" onClick={roomSelectHandler(room)}>
			<label>
				<input className="room-preview__radio" type="radio" name="room-selection" />
				<div className="room-preview__body">
					<h5 className="room-preview__name">{room.name}</h5>
					<div className="room-preview__last-message">{lastMessage ? lastMessage.content : '*empty*'}</div>
				</div>
			</label>
		</section>
	);
};

export default RoomPreview;
