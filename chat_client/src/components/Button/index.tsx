import React from 'react';
import './Button.css';

interface ButtonProps {
	pressable?: boolean;
	[key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({ pressable = false, children, className = '', ...props }) => {
	const classNames = `button ${className} ${pressable ? 'button--pressable' : ''}`;

	return (
		<button className={classNames} {...props}>
			{children as React.ReactNode}
		</button>
	);
};

export default Button;
