import React, { useEffect, useState } from 'react';
import './Range.css';

interface RangeProps {
	defaultValue?: number;
	onChange?: (newValue: number) => void;
	[key: string]: unknown;
}

const Range: React.FC<RangeProps> = ({ defaultValue = 0, onChange, ...props }) => {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		onChange && onChange(defaultValue);
	}, []);

	return (
		<input
			className="range"
			type="range"
			value={value}
			onChange={(event) => {
				const newValue = +event.target.value;
				setValue(newValue);
				onChange && onChange(newValue);
			}}
			// min={0}
			// max={360}
			{...props}
		/>
	);
};

export default Range;
