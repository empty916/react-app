import React, {
	useState,
	createContext,
	useEffect,
} from 'react';
import { Store } from './createStore';

type TProps = {
	store: Store;
	children: React.ReactNode;
}

// export default ({store, children}: TProps) => {
// 	const [state, setState] = useState(store.getState());
// 	return (
// 		<StoreContext.Provider value={state}>
// 			{children}
// 		</StoreContext.Provider>
// 	);
// }
