import { createContext, useContext } from 'react';
import chatState from './chatState';

export class RootStore {
	chat = chatState;
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
	const context = useContext(RootStoreContext);

	if (context === null) throw new Error('App is not wrapped in provider');

	return context;
};
