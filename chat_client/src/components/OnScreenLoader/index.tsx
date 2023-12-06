import React, { useEffect, useRef, useMemo, useState } from 'react';

interface OnScreenLoaderProps {
	onVisible: () => void;
	destroyOnVisible?: boolean;
	[key: string]: unknown;
}

const OnScreenLoader: React.FC<OnScreenLoaderProps> = ({ onVisible, children, destroyOnVisible }) => {
	const [isDestroyed, setIsDestroyed] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const observer = useMemo(
		() =>
			new IntersectionObserver(([entry]) => {
					if (entry.isIntersecting && !isDestroyed) {
						onVisible();
						destroyOnVisible && setIsDestroyed(true);
					}
				},
				// { rootMargin: '0px', threshold: 1.0 }, // saved on case if will needed to detect fully visible or not
			),
		[onVisible],
	);

	useEffect(() => {
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return isDestroyed ? null : <div ref={ref}>{children as React.ReactNode}</div>;
};

export default OnScreenLoader;
