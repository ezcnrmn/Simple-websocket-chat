import React from 'react';
import './loading.css';

const Loading: React.FC = () => (
	<div className="loading">
		<div className="loading__square-outternal">
			<div className="loading__square-inner"></div>
		</div>
	</div>
);

export default Loading;
