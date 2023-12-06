import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import chatState from '../../store/chatState';

const setActive = ({ isActive }: { isActive: boolean; isPending: boolean }) =>
	isActive ? 'navigation__item navigation__item--active' : 'navigation__item';

const Navigation: React.FC = () => {
	const { isAuthorizated } = chatState;

	return (
		<nav className="navigation">
			<NavLink to="/" className={setActive}>
				Main
			</NavLink>

			{isAuthorizated && (
				<>
					<NavLink to="/chatrooms" className={setActive}>
						Chatrooms
					</NavLink>
				</>
			)}
			{!isAuthorizated && (
				<>
					<NavLink to="/authentication" className={setActive}>
						Authentication
					</NavLink>
				</>
			)}

			{/* <NavLink to="/layout-test" className={setActive}>
				layout-test
			</NavLink> */}
		</nav>
	);
};

export default observer(Navigation);
