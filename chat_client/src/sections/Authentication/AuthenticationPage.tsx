import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Toggle from '../../components/Toggle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { signInUser, signUpUser } from '../../api/userApi';
import showNotification from '../../components/Notification/showNotification';
import chatState from '../../store/chatState';
import { useNavigate } from 'react-router-dom';
import './authentication.css';

const AuthenticationPage: React.FC = () => {
	const [signUp, setSignUp] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (chatState.isAuthorizated) navigate('/');

		document.title = 'Authentication';
	}, []);

	const authenticationHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();

		if (!username || !password) return;

		const user = { username, password };

		let response;
		if (signUp) {
			response = await signUpUser(user);
		} else {
			response = await signInUser(user);
		}

		const notificationTitle = `You are successfully ${signUp ? 'signed up' : 'signed in'}!`;

		if (response.isOk) {
			showNotification({ title: notificationTitle, type: 'success' }, 3000);
			chatState.setCurrentUser({ username: response.data.username, id: response.data.id });
			navigate('/chatrooms');
		} else {
			showNotification({ title: response.data, type: 'error' }, 0);
		}
	};

	return (
		<div className="authentication">
			<div className="authentication__header">
				<h2 className={`authentication__title ${!signUp ? 'highlight' : ''}`}>Sign in</h2>
				<Toggle className="authentication__toggle" value={signUp} onChange={(value) => setSignUp(value)} />
				<h2 className={`authentication__title ${signUp ? 'highlight' : ''}`}>Sign up</h2>
			</div>
			<form className="authentication__form" name="authentication">
				<Input label="username" value={username} setValue={setUsername} />
				<Input label="password" value={password} setValue={setPassword} isPassword />
				<div className="authentication__submit">
					<Button type="submit" onClick={authenticationHandler} pressable>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default observer(AuthenticationPage);
