class ApiError extends Error {
	status;

	constructor(message, status) {
		super(message);
		this.status = status;
	}

	static BadRequest(message) {
		return new ApiError(message, 400);
	}

	static UnauthorizedError() {
		return new ApiError('Unauthorized', 401);
	}

	static InternalError(message) {
		return new ApiError(message, 500);
	}
}

module.exports = ApiError;
