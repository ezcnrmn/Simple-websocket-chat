const ApiError = require('../exceptions/apiError');

const errorMiddleware = (err, req, res, next) => {
	console.log('\n', err);

	if (err instanceof ApiError) {
		return res.status(err.status).json(err.message);
	}

	return res.status(500).json('Unexpected error');
};

module.exports = errorMiddleware;
