export const formatOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
};

export const fromISOToLocal = (ISOString: string) => {
	const date = new Date(ISOString);

	return date.toLocaleDateString('en-US', formatOptions);
};
