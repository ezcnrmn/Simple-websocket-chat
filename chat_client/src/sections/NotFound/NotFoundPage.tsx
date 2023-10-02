import React, { useEffect } from 'react';

const NotFound: React.FC = () => {
	useEffect(() => {
		document.title = 'Not found';
	}, []);

	return <h2>Page is not found</h2>;
};

export default NotFound;
