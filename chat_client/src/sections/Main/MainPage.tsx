import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import chatState from '../../store/chatState';

const MainPage: React.FC = () => {
	const { currentUser } = chatState;

	useEffect(() => {
		document.title = 'Chat';
	}, []);

	return (
		<div>
			<h2>{currentUser ? `Welcome ${currentUser.username}` : 'You are not authentificated'}</h2>
		</div>
	);
};

export default observer(MainPage);
