import {
	useState,
	createContext,
} from 'react';

type anyFn = (...arg: any[]) => any;

type TCombineReducer = {
	[moduleName: string]: {
		[type: string]: anyFn,
	};
};
type TReducer = {
	[type: string]: anyFn,
};
type TAction = {
	type: string;
	[p: string]: any;
};

const isPromise = (obj: any) => obj && typeof obj.then === 'function';


export interface Store {
	getState: () => any;
	createDispatch: (a: string) => (action: TAction) => void;
	addReducer: (moduleName: string, reducerFn: TReducer) => void;
	setReducer: (moduleName: string, reducerFn: TReducer) => void;
	replaceReducer: (newReducer: TCombineReducer) => void;
	subscribe: (listener: anyFn) => () => void;
}

type TCreateStore = (reducers?: TCombineReducer, initialState?: any) => Store;

const createStore: TCreateStore = (reducers: TCombineReducer = {}, initialState: any = {}) => {
	let currentState = initialState;
	let currentReducers = reducers;
	let listeners: anyFn[] = [];
	const setStore = (newStore: any) => currentState = newStore;
	const replaceReducer = (newReducer: TCombineReducer) => currentReducers = newReducer;
	const getState = () => currentState;
	// 添加单个reducer方法
	const addReducer = (moduleName: string, reducerFn: TReducer) => {
		if(currentReducers[moduleName]) {
			throw new Error('reducer module has exist!');
		}
		currentReducers[moduleName] = reducerFn;
	}
	// 设置单个reducer方法
	const setReducer = (moduleName: string, reducerFn: TReducer) => {
		currentReducers[moduleName] = reducerFn;
	}
	const runListeners = () => listeners.forEach(listener => listener());

	const createDispatch = (moduleName: string) => {
		if (!currentReducers[moduleName]) {
			throw new Error('reducer is not exist');
		}
		return (action: TAction) => {
			const newState: any = { ...currentState };
			let storeFrag;
			if (!!currentReducers[moduleName] && !!currentReducers[moduleName][action.type]) {
				storeFrag = currentReducers[moduleName][action.type](
					newState[moduleName],
					action,
					newState
				);
			} else {
				return;
			}
			if(isPromise(storeFrag)) {
				return storeFrag.then((ns: any) => {
					newState[moduleName] = ns;
					setStore(newState);
					runListeners()
					return Promise.resolve();
				});
			} else {
				newState[moduleName] = storeFrag;
				setStore(newState);
				runListeners();
			}
		};
	};
	const subscribe = (listener: anyFn) => {
		const idx = listeners.length;
		listeners.push(listener);
		return () => listeners = listeners.filter((_:any, index: number) => index !== idx);
	};

	return {
		getState,
		createDispatch,
		addReducer,
		setReducer,
		replaceReducer,
		subscribe,
	};
};
export const StoreContext = createContext({} as Store);
export default createStore;
