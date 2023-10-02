import React from 'react';
import './TextArea.css';

interface TextAreaProps {
	[key: string]: unknown;
}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => (
	<textarea className={`textarea ${className}`} {...props} />
);

export default TextArea;
