import axios from 'axios';
import showNotification from '../components/Notification/showNotification';
import config from '../../config';
import { TOKEN_STORAGE_KEY } from '../helpers/consts';

const baseURL = config.API_BASE_URL;

const host = axios.create({
	baseURL,
	// validateStatus: () => true,
	withCredentials: true,
});

host.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`;

	return config;
});

host.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get(`${baseURL}api/user/refresh`, { withCredentials: true });
				localStorage.setItem(TOKEN_STORAGE_KEY, response.data.tokens.accessToken);
				return host.request(originalRequest);
			} catch (__) {
				showNotification({ title: 'Authentication error', type: 'error' }, 0);
			}
		}
		throw error;
	},
);

export default host;
