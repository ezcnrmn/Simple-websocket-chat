import showNotification from '../components/Notification/showNotification';
import { TOKEN_STORAGE_KEY } from '../helpers/consts';
import host from './host';

const showError = (url: string, message: string) => {
	showNotification({ title: `Error with ${url}`, description: message, type: 'error' }, 0);
};

export const signInUser = async (user: { username: string; password: string }) => {
	const url = '/api/user/signin';
	let res;

	try {
		res = await host.post(url, user);
	} catch (error: any) {
		res = error.response;
		// showError(url, error.message);
	}

	if (res.statusText === 'OK') {
		localStorage.setItem(TOKEN_STORAGE_KEY, res.data.tokens.accessToken);
		return { isOk: true, data: res.data.user };
	}

	return { isOk: false, data: res.data };
};

export const currentUser = async () => {
	const url = '/api/user/current';
	let res;

	try {
		res = await host.get(url);
	} catch (error: any) {
		res = error.response;
		// showError(url, error.message);
	}

	if (res.statusText === 'OK') {
		return { isOk: true, data: res.data.user };
	}

	return { isOk: false, data: res.data };
};

export const signUpUser = async (user: { username: string; password: string }) => {
	const url = '/api/user/signup';
	let res;

	try {
		res = await host.post(url, user);
	} catch (error: any) {
		res = error.response;
		// showError(url, error.message);
	}

	if (res.statusText === 'OK') {
		localStorage.setItem(TOKEN_STORAGE_KEY, res.data.tokens.accessToken);
		return { isOk: true, data: res.data.user };
	}

	return { isOk: false, data: res.data };
};

export const logout = async (id: string) => {
	const url = '/api/user/logout';
	let res;

	try {
		res = await host.post(url, { id });
	} catch (error: any) {
		res = error.response;
		// showError(url, error.message);
	}

	if (res.statusText === 'OK') {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		return { isOk: true };
	}

	return { isOk: false, data: res.data };
};

// API FOR TESTS
export const testApi = async () => {
	const url = '/api/test-api';
	let res;

	try {
		res = await host.get(url);
	} catch (error: any) {
		res = error.response;
		// showError(url, error.message);
	}

	if (res.statusText === 'OK') {
		return { isOk: true, data: res.data };
	}

	return { isOk: false, data: res.data };
};
