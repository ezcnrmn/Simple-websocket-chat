const timestampToString = (timestamp) => {
	const date = new Date(timestamp);

	return date.toISOString();
};

module.exports = { timestampToString };
