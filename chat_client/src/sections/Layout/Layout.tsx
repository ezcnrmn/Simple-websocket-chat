import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Range from '../../components/Range';
import Navigation from './Navigation';
import Button from '../../components/Button';
import chatState from '../../store/chatState';
import showNotification from '../../components/Notification/showNotification';
import { logout } from '../../api/userApi';
import './layout.css';
import { COLOR_PROP_NAME } from '../../helpers/consts';

const getDefaultColor = () => {
	const color = window.localStorage.getItem(COLOR_PROP_NAME);

	if (color) return +color;

	return +window.getComputedStyle(document.body).getPropertyValue(COLOR_PROP_NAME);
};

const Layout: React.FC = () => {
	const navigate = useNavigate();

	const logoutHandler = async () => {
		const { currentUser } = chatState;

		if (!currentUser) {
			showNotification(
				{
					type: 'error',
					title: 'Error when trying to logout',
					description: 'Cannot logout because there is no currentUser in chatState',
				},
				0,
			);
			return;
		}

		const response = await logout(currentUser.id);

		if (response.isOk) {
			showNotification({ title: 'You logouted!', type: 'success' }, 3000);
			chatState.setCurrentUser(null);
			navigate('/');
		} else {
			showNotification({ title: response.data, type: 'error' }, 0);
		}
	};

	return (
		<>
			<header className="header">
				<Navigation />
				<span className="header__theme">
					<Range
						defaultValue={getDefaultColor()}
						onChange={(value) => {
							document.documentElement.style.setProperty(COLOR_PROP_NAME, value.toString());
							window.localStorage.setItem(COLOR_PROP_NAME, value.toString());
						}}
						min={0}
						max={359}
					/>
				</span>
				{chatState.isAuthorizated ? (
					<Button onClick={logoutHandler} pressable>
						Logout
					</Button>
				) : null}
			</header>

			<main className="main">
				<Outlet />
			</main>

			<footer className="footer" />
		</>
	);
};

export default Layout;
