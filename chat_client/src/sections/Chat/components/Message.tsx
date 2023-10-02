import React from 'react';
import { Message as MessageType } from '../../../types/chatTypes';
import { fromISOToLocal } from '../../../helpers/time';

export interface MessageProps extends MessageType {}

const Message: React.FC<MessageProps> = ({ content, author, date = '' }) => (
	<section className="message">
		<div className="message__header">
			{author.username} - {fromISOToLocal(date)}
		</div>
		<div className="message__content">{content}</div>
	</section>
);

export default Message;
