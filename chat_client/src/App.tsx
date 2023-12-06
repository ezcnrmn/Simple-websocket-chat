import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './sections/Layout/Layout';
import NotFound from './sections/NotFound/NotFoundPage';
import MainPage from './sections/Main/MainPage';
import ChatPage from './sections/Chat/ChatPage';
import { RootStore, RootStoreContext } from './store/rootStore';
import AuthenticationPage from './sections/Authentication/AuthenticationPage';
import LayoutTestPage from './sections/LayoutTest/LayoutTestPage';
import './styles/app.css';

const App = function () {
	return (
		<RootStoreContext.Provider value={new RootStore()}>
			<div className="app">
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<MainPage />} />
						<Route path="authentication" element={<AuthenticationPage />} />
						<Route path="chatrooms" element={<ChatPage />} />
						<Route path="layout-test" element={<LayoutTestPage />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</div>
		</RootStoreContext.Provider>
	);
};

export default App;
