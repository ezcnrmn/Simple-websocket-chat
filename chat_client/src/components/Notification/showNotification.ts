import './Notification.css';
import {
	crossCircleIconHTML,
	alertHexagonIconHTML,
	checkCircleIconHTML,
	messageIconHTML,
	alertCircleIconHTML,
} from '../Icons';

const CONTAINER_ID = 'notification-container';
type NotificationType = 'success' | 'error' | 'warn' | 'info';

const getIconHTMLFromType = (type: NotificationType) => {
	let innerHTML = '';

	switch (type) {
		case 'success':
			innerHTML = checkCircleIconHTML({ className: 'notification__icon', color: '#0f0' });
			break;
		case 'error':
			innerHTML = alertHexagonIconHTML({ className: 'notification__icon', color: '#f00' });
			break;
		case 'warn':
			innerHTML = alertCircleIconHTML({ className: 'notification__icon', color: '#ff0' });
			break;
		case 'info':
			innerHTML = messageIconHTML({ className: 'notification__icon' });
			break;
	}

	return innerHTML;
};

interface Notification {
	type?: NotificationType;
	title: string;
	description?: string;
}
const createNotification = ({ type = 'info', title, description }: Notification) => {
	const notification = document.createElement('div');
	notification.classList.add('notification');

	const headerNode = document.createElement('div');
	headerNode.classList.add('notification__header');

	const iconNode = document.createElement('span');
	iconNode.innerHTML = getIconHTMLFromType(type);

	const titleNode = document.createElement('h6');
	titleNode.classList.add('notification__title');
	titleNode.appendChild(document.createTextNode(title));

	const closeNode = document.createElement('button');
	closeNode.type = 'button';
	closeNode.classList.add('notification__close');
	closeNode.innerHTML = crossCircleIconHTML({ className: 'notification__close-icon' });

	const removeHandler = () => {
		closeNode.removeEventListener('click', removeHandler);
		notification.remove();
	};
	closeNode.addEventListener('click', removeHandler);

	headerNode.appendChild(iconNode);
	headerNode.appendChild(titleNode);
	headerNode.appendChild(closeNode);

	notification.appendChild(headerNode);

	if (description) {
		const descriptionNode = document.createElement('p');
		descriptionNode.classList.add('notification__description');
		descriptionNode.appendChild(document.createTextNode(description));
		notification.appendChild(descriptionNode);
	}

	return notification;
};

const showNotification = (notification: Notification, duration: number = 5000) => {
	const notificationNode = createNotification(notification);

	let container = document.getElementById(CONTAINER_ID);

	if (!container) {
		container = document.createElement('div');
		container.id = CONTAINER_ID;
		container.classList.add(CONTAINER_ID);
		document.body.appendChild(container);
	}

	container.appendChild(notificationNode);

	if (duration > 0) {
		setTimeout(() => {
			notificationNode.remove();
		}, duration);
	}
};

export default showNotification;
