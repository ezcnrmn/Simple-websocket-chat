// import showNotification from '../components/Notification/showNotification';
import { TOKEN_STORAGE_KEY } from '../helpers/consts';
import host from './host';

export const signInUser = async (user: { username: string; password: string }) => {
	let res;

	try {
		res = await host.post('/api/user/signin', user);
	} catch (error: any) {
		res = error.response;
		// showNotification({ title: 'Error with /api/user/signin', description: error.message, type: 'error' }, 0);
	}

	if (res.statusText === 'OK') {
		localStorage.setItem(TOKEN_STORAGE_KEY, res.data.tokens.accessToken);
		return { isOk: true, data: res.data.user };
	}

	return { isOk: false, data: res.data };
};

export const signUpUser = async (user: { username: string; password: string }) => {
	let res;

	try {
		res = await host.post('/api/user/signup', user);
	} catch (error: any) {
		res = error.response;
		// showNotification({ title: 'Error with /api/user/signup', description: error.message, type: 'error' }, 0);
	}

	if (res.statusText === 'OK') {
		localStorage.setItem(TOKEN_STORAGE_KEY, res.data.tokens.accessToken);
		return { isOk: true, data: res.data.user };
	}

	return { isOk: false, data: res.data };
};

export const logout = async (id: string) => {
	let res;

	try {
		res = await host.post('/api/user/logout', { id });
	} catch (error: any) {
		res = error.response;
		// showNotification({ title: 'Error with /api/user/logout', description: error.message, type: 'error' }, 0);
	}

	if (res.statusText === 'OK') {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		return { isOk: true };
	}

	return { isOk: false, data: res.data };
};

// API FOR TESTS
export const testApi = async () => {
	let res;

	try {
		res = await host.get('/api/test-api');
	} catch (error: any) {
		res = error.response;
		// showNotification({ title: 'Error with /api/test-api', description: error.message, type: 'error' }, 0);
	}

	if (res.statusText === 'OK') {
		return { isOk: true, data: res.data };
	}

	return { isOk: false, data: res.data };
};
