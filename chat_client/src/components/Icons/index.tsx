import React from 'react';
import { renderToString } from 'react-dom/server';
import './icons.css';

const defaultColor = 'hsl(var(--default-hue), 50%, 50%)';

interface IconProps {
	className?: string;
	color?: string;
}

export const CrossSquareIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			fill={color}
		/>
		<path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			stroke={color}
			strokeWidth="2"
		/>
	</svg>
);
export const crossSquareIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<CrossSquareIcon className={className} color={color} />);

export const CrossCircleIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			fill={color}
		/>
		<path
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			stroke={color}
			strokeWidth="2"
		/>
		<path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
export const crossCircleIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<CrossCircleIcon className={className} color={color} />);

export const CheckSquareIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			fill={color}
		/>
		<path
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			stroke={color}
			strokeWidth="2"
		/>
		<path
			d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export const checkSquareIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<CheckSquareIcon className={className} color={color} />);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			fill={color}
		/>
		<path
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			stroke={color}
			strokeWidth="2"
		/>
		<path
			d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export const checkCircleIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<CheckCircleIcon className={className} color={color} />);

export const MessageIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
			fill={color}
		/>
		<path d="M8 10H8.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M12 10H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M16 10H16.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path
			d="M21 13V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579C3 4.17157 3 5.11438 3 7V13C3 14.8856 3 15.8284 3.58579 16.4142C4.17157 17 5.11438 17 7 17H7.5C7.77614 17 8 17.2239 8 17.5V20V20.1499C8 20.5037 8.40137 20.7081 8.6875 20.5L13.0956 17.2941C13.3584 17.103 13.675 17 14 17H17C18.8856 17 19.8284 17 20.4142 16.4142C21 15.8284 21 14.8856 21 13Z"
			stroke={color}
			strokeWidth="2"
			strokeLinejoin="round"
		/>
	</svg>
);
export const messageIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<MessageIcon className={className} color={color} />);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M10.2501 5.147L3.64909 17.0287C2.9085 18.3618 3.87244 20 5.39741 20H18.5994C20.1243 20 21.0883 18.3618 20.3477 17.0287L13.7467 5.147C12.9847 3.77538 11.0121 3.77538 10.2501 5.147Z"
			fill={color}
		/>
		<path d="M12 10V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path d="M12 16V15.9888" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path
			d="M10.2515 5.147L3.65056 17.0287C2.90997 18.3618 3.8739 20 5.39887 20H18.6008C20.1258 20 21.0897 18.3618 20.3491 17.0287L13.7482 5.147C12.9861 3.77538 11.0135 3.77538 10.2515 5.147Z"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export const alertTriangleIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<AlertTriangleIcon className={className} color={color} />);

export const AlertSquareIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			fill={color}
		/>
		<path d="M12 8L12 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path d="M12 16V15.9888" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path
			d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
			stroke={color}
			strokeWidth="2"
		/>
	</svg>
);
export const alertSquareIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<AlertSquareIcon className={className} color={color} />);

export const AlertHexagonIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z"
			fill={color}
		/>
		<path
			d="M3 9.22843V14.7716C3 15.302 3.21071 15.8107 3.58579 16.1858L7.81421 20.4142C8.18929 20.7893 8.69799 21 9.22843 21H14.7716C15.302 21 15.8107 20.7893 16.1858 20.4142L20.4142 16.1858C20.7893 15.8107 21 15.302 21 14.7716V9.22843C21 8.69799 20.7893 8.18929 20.4142 7.81421L16.1858 3.58579C15.8107 3.21071 15.302 3 14.7716 3H9.22843C8.69799 3 8.18929 3.21071 7.81421 3.58579L3.58579 7.81421C3.21071 8.18929 3 8.69799 3 9.22843Z"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M12 8V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path d="M12 16V15.9888" stroke={color} strokeWidth="2" strokeLinecap="round" />
	</svg>
);
export const alertHexagonIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<AlertHexagonIcon className={className} color={color} />);

export const AlertCircleIcon: React.FC<IconProps> = ({ className = '', color = defaultColor }) => (
	<svg
		width="2em"
		height="2em"
		className={`icon ${className}`}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			opacity="0.1"
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			fill={color}
		/>
		<path
			d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
			stroke={color}
			strokeWidth="2"
		/>
		<path d="M12 8L12 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path d="M12 16V15.9888" stroke={color} strokeWidth="2" strokeLinecap="round" />
	</svg>
);
export const alertCircleIconHTML = ({ className, color = defaultColor }: IconProps = {}) =>
	renderToString(<AlertCircleIcon className={className} color={color} />);
