import React from 'react';
import './Details.css';

interface DetailsProps {
	title: string;
	[key: string]: unknown;
}

const Details: React.FC<DetailsProps> = ({ title, children }) => (
	<details className="details">
		<summary className="details__title">{title}</summary>
		<div className="details__content">{children as React.ReactNode}</div>
	</details>
);

export default Details;
