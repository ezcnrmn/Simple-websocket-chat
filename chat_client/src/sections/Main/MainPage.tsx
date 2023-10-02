import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import chatState from '../../store/chatState';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
	const { currentUser, isAuthorizated } = chatState;
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthorizated) navigate('./authentication');

		document.title = 'Chat';
	}, []);

	return (
		<div>
			<h2>{currentUser ? `Welcome ${currentUser.username}` : 'You are not authentificated'}</h2>
		</div>
	);
};

export default observer(MainPage);
