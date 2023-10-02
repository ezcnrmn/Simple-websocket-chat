const bcrypt = require('bcryptjs');
const ApiError = require('../exceptions/apiError');

const { generateTokens, verifyRefreshToken } = require('../helpers/token');

const UserService = require('../db/userService');
const TokenService = require('../db/tokenService');

const refreshTokenSetting = { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };
const { REFRESH_TOKEN_COOKIE } = require('../helpers/consts');

class UserController {
	async loginUser(req, res, next) {
		const { username, password } = req.body;

		try {
			const user = await UserService.findByUsername(username);

			if (!user) {
				next(ApiError.BadRequest('User is not found'));
				return;
			}

			const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid) {
				next(ApiError.BadRequest('Wrong password'));
				return;
			}

			const tokens = generateTokens({ id: user.id, username: user.username });

			const savedToken = await TokenService.saveToken(user.id, tokens.refreshToken);

			if (!savedToken) {
				next(ApiError.InternalError('Token is not saved'));
				return;
			}

			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenSetting);
			res.json({ user: { id: user.id, username: user.username }, tokens });
		} catch (error) {
			next(error);
		}
	}

	async registerUser(req, res, next) {
		const { username, password } = req.body;

		try {
			const user = await UserService.findByUsername(username);

			if (user) {
				next(ApiError.BadRequest(`User with username "${username}" is already exist`));
				return;
			}

			const hashedPassword = bcrypt.hashSync(password, 7);

			const newUser = await UserService.createUser(username, hashedPassword);

			if (!newUser) {
				next(ApiError.BadRequest('User is not created'));
				return;
			}

			console.log('newUser', newUser);
			TokenService.createRecord(newUser.id);

			const tokens = generateTokens({ id: newUser.id, username: newUser.username });

			const savedToken = await TokenService.saveToken(newUser.id, tokens.refreshToken);

			if (!savedToken) {
				next(ApiError.InternalError('Token is not saved'));
				return;
			}

			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenSetting);
			res.json({ user: { id: newUser.id, username: newUser.username }, tokens });
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		const { id } = req.body;
		const { refreshToken } = req.cookies;

		try {
			const token = await TokenService.eraseToken(id, refreshToken);

			// if (!token) {
			// 	next(ApiError.InternalError('Token was not erased successfully'));
			// 	return;
			// }

			res.clearCookie(REFRESH_TOKEN_COOKIE);
			return res.json('Logout completed');
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		const { refreshToken } = req.cookies;

		try {
			const user = verifyRefreshToken(refreshToken);
			const isTokenExist = await TokenService.isExist(user.id, refreshToken);

			if (!user || !isTokenExist) {
				next(ApiError.BadRequest('Token is not found'));
				return;
			}

			const tokens = generateTokens({ id: user.id, username: user.username });

			const savedToken = await TokenService.saveToken(user.id, tokens.refreshToken);

			if (!savedToken) {
				next(ApiError.InternalError('Token is not saved'));
				return;
			}

			res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenSetting);
			res.json({ user: { id: user.id, username: user.username }, tokens });
		} catch (error) {
			next(error);
		}
	}

	// TODO: API FOR TESTS
	async testApi(req, res, next) {
		res.json({ some: { data: 'here' } });
	}
}

module.exports = new UserController();
