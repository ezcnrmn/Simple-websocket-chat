import React, { ReactNode } from 'react';
import './toggle.css';

interface ToggleProps {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	label?: ReactNode | string;
	className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, disabled, onChange, label, className = '' }) => {
	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.checked;
		onChange(newValue);
	};

	return (
		<label className={`toggle ${className}`}>
			<input className="toggle__input" type="checkbox" checked={value} onChange={onChangeHandler} disabled={disabled} />
			<span className="toggle__toggle" />
			{label}
		</label>
	);
};

export default Toggle;
