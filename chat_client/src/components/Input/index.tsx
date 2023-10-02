import React, { useId } from 'react';
import './Input.css';

interface InputProps {
	label: string;
	value: string;
	setValue: (newValue: string) => void;
	isPassword?: boolean;
	className?: string;
	[key: string]: unknown;
}

const Input: React.FC<InputProps> = ({ label, value, setValue, isPassword, className = '', ...props }) => {
	const inputId = useId();
	return (
		<div className={`input ${className}`}>
			<label className="input__label" htmlFor={inputId}>
				{label}
			</label>
			<input
				className="input__field"
				id={inputId}
				value={value}
				onChange={(event) => setValue(event.target.value)}
				type={isPassword ? 'password' : 'text'}
				{...props}
			/>
		</div>
	);
};

export default Input;
