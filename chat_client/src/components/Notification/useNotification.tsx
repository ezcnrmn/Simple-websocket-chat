/* This component is not used and finished yet, because hooks cannot be used everywhere */

import React, { useState } from 'react';
import { AlertCircleIcon, AlertHexagonIcon, CheckCircleIcon, CrossCircleIcon, MessageIcon } from '../Icons';
import './Notification.css';

type NotificationType = 'success' | 'error' | 'warn' | 'info';
interface INotification {
	type?: NotificationType;
	title: string;
	description?: string;
}
interface NotificationProps extends INotification {
	removeHandler: () => void;
}
const getIconFromType = (type: NotificationType) => {
	let icon;

	switch (type) {
		case 'success':
			icon = <CheckCircleIcon className="notification__icon" color="#0f0" />;
			break;
		case 'error':
			icon = <AlertHexagonIcon className="notification__icon" color="#f00" />;
			break;
		case 'warn':
			icon = <AlertCircleIcon className="notification__icon" color="#ff0" />;
			break;
		case 'info':
		default:
			icon = <MessageIcon className="notification__icon" />;
	}

	return icon;
};
const Notification: React.FC<NotificationProps> = ({ type = 'info', title, description, removeHandler }) => (
	<div className="notification">
		<div className="notification__header">
			<span>{getIconFromType(type)}</span>
			<h6 className="notification__title">{title}</h6>
			<button className="notification__close" type="button" onClick={removeHandler}>
				<CrossCircleIcon className="notification__close-icon" />
			</button>
		</div>
		{description ? <p className="notification__description">{description}</p> : null}
	</div>
);

type timerIdType = ReturnType<typeof setTimeout> | number;
interface NotificationsState {
	notification: React.ReactElement;
	duration: number;
	timerId: timerIdType;
}
const useNotification = (containerId: string) => {
	const [notifications, setNotifications] = useState<NotificationsState[]>([]);

	const deleteNotification = (timerId: timerIdType) => {
		setNotifications((prev) => prev.filter((notif) => notif.timerId !== timerId));
	};

	const NotificationContainer: React.FC = () => (
		<div id={containerId} className="notification-container">
			{notifications.map((notif) => (
				<React.Fragment key={`${notif.timerId}`}>{notif.notification}</React.Fragment>
			))}
		</div>
	);

	const showNotification = (notification: INotification, duration: number = 5000) => {
		const timerId = duration
			? setTimeout(() => {
					deleteNotification(timerId);
			  }, duration)
			: Date.now();

		const notif = <Notification {...notification} removeHandler={() => deleteNotification(timerId)} />;

		setNotifications((prev) => [
			...prev,
			{
				notification: notif,
				duration,
				timerId,
			},
		]);
	};

	return { NotificationContainer, showNotification };
};

export const NotificationContext = React.createContext({
	showNotification: (notification: INotification, duration: number) => {},
});

export default useNotification;
