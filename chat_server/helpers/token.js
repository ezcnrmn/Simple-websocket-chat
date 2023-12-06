const jwt = require('jsonwebtoken');
const config = require('../config');

const generateTokens = (payload) => {
	try {
		const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '10m' });
		const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });

		return { accessToken, refreshToken };
	} catch (error) {
		return null;
	}
};

const verifyAccessToken = (token) => {
	try {
		return jwt.verify(token, config.JWT_ACCESS_SECRET);
	} catch (error) {
		return false;
	}
};

const verifyRefreshToken = (token) => {
	try {
		return jwt.verify(token, config.JWT_REFRESH_SECRET);
	} catch (error) {
		return false;
	}
};

module.exports = {
	generateTokens,
	verifyAccessToken,
	verifyRefreshToken,
};
