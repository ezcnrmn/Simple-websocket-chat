const { verifyAccessToken } = require('../helpers/token');
const ApiError = require('../exceptions/apiError');

const authMiddleware = (req, res, next) => {
	if (req.method === 'OPTIONS') next();

	try {
		const token = (req.headers.authorization ?? ' ').split(' ')[1];

		if (!token) {
			next(ApiError.UnauthorizedError());
			return;
		}

		const user = verifyAccessToken(token);

		if (!user) {
			next(ApiError.UnauthorizedError());
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		next(ApiError.UnauthorizedError());
		return;
	}
};

module.exports = authMiddleware;
