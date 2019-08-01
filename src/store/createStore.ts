import {
	createContext,
} from 'react';

type anyFn = (...arg: any[]) => any;

type TCombineAction = {
	[moduleName: string]: {
		[type: string]: anyFn,
	};
};
type TActions = {
	[type: string]: anyFn,
};
type TActionParams = {
	type: string;
	[p: string]: any;
};

const isPromise = (obj: any) => obj && typeof obj.then === 'function';


export interface Store {
	getState: () => any;
	createDispatch: (a: string) => (action: TActionParams) => void | Promise<any>;
	addAction: (moduleName: string, actionsObj: TActions) => void;
	setAction: (moduleName: string, actionsObj: TActions) => void;
	replaceAction: (newAction: TCombineAction) => void;
	subscribe: (listener: anyFn) => () => void;
}

type TCreateStore = (actions?: TCombineAction, initialState?: any) => Store;

const createStore: TCreateStore = (actions: TCombineAction = {}, initialState: any = {}) => {
	let currentState = initialState;
	let currentActions = actions;
	let listeners: anyFn[] = [];
	const setStore = (newStore: any) => currentState = newStore;
	const replaceAction = (newAction: TCombineAction) => currentActions = newAction;
	const getState = () => currentState;
	// 添加单个reducer方法
	const addAction = (moduleName: string, actionsObj: TActions) => {
		if(currentActions[moduleName]) {
			throw new Error('action module has exist!');
		}
		currentActions[moduleName] = actionsObj;
	}
	// 设置单个reducer方法
	const setAction = (moduleName: string, actionsObj: TActions) => {
		currentActions[moduleName] = actionsObj;
	}
	const runListeners = () => listeners.forEach(listener => listener());

	const createDispatch = (moduleName: string) => {
		if (!currentActions[moduleName]) {
			throw new Error('reducer is not exist');
		}
		return ({type, ...arg}: TActionParams) => {
			const newState: any = { ...currentState };
			let stateFrag;
			if (!!currentActions[moduleName] && !!currentActions[moduleName][type]) {
				stateFrag = currentActions[moduleName][type](
					newState[moduleName],
					{...arg},
					newState
				);
			} else {
				return;
			}
			if(isPromise(stateFrag)) {
				return stateFrag.then((ns: any) => {
					newState[moduleName] = ns;
					setStore(newState);
					runListeners();
					return Promise.resolve();
				});
			} else {
				newState[moduleName] = stateFrag;
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
		addAction,
		setAction,
		replaceAction,
		subscribe,
	};
};
export const StoreContext = createContext({} as Store);
export default createStore;
