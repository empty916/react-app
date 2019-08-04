import {
	createContext,
} from 'react';
import {
	addStateTailMark,
	addActionsTailMark,
	formatStateObj,
	formatActionsObj,
	formatModuleName,
} from './utils';
import curry from 'lodash/fp/curry';

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
export interface StoreModule {
	state: any;
	actions: TActions;
	view?: anyFn;
}

const isPromise = (obj: any) => obj && typeof obj.then === 'function';


export interface Store {
	getState: () => any;
	createDispatch: (a: string) => (type: string, data: any) => void | Promise<any>;
	addModule: (moduleName: string, module: StoreModule) => void;
	getModule: (moduleName: string) => any;
	setModule: (moduleName: string, module: StoreModule) => void;
	hasModule: (moduleName: string) => boolean;
	replaceAction: (newAction: TCombineAction) => void;
	subscribe: (listener: anyFn) => () => void;
}

type TCreateStore = (actions?: TCombineAction, initialState?: any) => Store;

const createStore: TCreateStore = <T extends {[p:string]: T|any}>(actions: TCombineAction = {}, initialState: T|{} = {}) => {
	let currentState = formatStateObj(initialState);
	let currentActions = formatActionsObj(actions);
	let listeners: anyFn[] = [];
	const setState = (newState: any) => currentState = formatStateObj(newState);
	const replaceAction = (newAction: TCombineAction) => currentActions = formatActionsObj(newAction);
	const getState = () => currentState;
	// 添加module
	const addModule = (moduleName: string, {state, actions}: StoreModule) => {
		if(!!currentActions[moduleName] || !!(currentState as T)[moduleName]) {
			throw new Error('action module has exist!');
		}
		currentState = {
			...currentState,
			[addStateTailMark(moduleName)]: state,
		};
		currentActions = {
			...currentActions,
			[addActionsTailMark(moduleName)]: actions,
		};
		runListeners();
	}
	// 获取module
	const getModule = (moduleName: string) => {
		const state = (currentState as T)[addStateTailMark(moduleName)];
		let actionsProxy = {...currentActions[addActionsTailMark(moduleName) as keyof TCombineAction]};
		const dispatch = createDispatch(moduleName);
		Object.keys(actionsProxy).forEach(key => actionsProxy[key] = (data: any) => dispatch(key, data))

		return {
			[formatModuleName(moduleName)]: {
				state,
				actions: actionsProxy,
			}
		}
	}
	// 修改module
	const setModule = (moduleName: string, {state, actions}: StoreModule) => {
		if ((currentState as T)[moduleName] !== state) {
			currentState = {
				...currentState,
				[addStateTailMark(moduleName)]: state,
			};
			runListeners();
		}
		if (currentActions[moduleName] !== actions) {
			currentActions = {
				...currentActions,
				[addActionsTailMark(moduleName)]: actions,
			};
		}
	}
	// 查看module是否存在
	const hasModule = (moduleName: string) => {
		return !!currentActions[addActionsTailMark(moduleName)] && !!(currentState as T)[addStateTailMark(moduleName)];
	}
	const runListeners = () => listeners.forEach(listener => listener());

	const createDispatch = (moduleName: string) => {
		if (!hasModule(moduleName)) {
			throw new Error('module is not exist!');
		}
		const actionsName = addActionsTailMark(moduleName);
		const stateName = addStateTailMark(moduleName);

		return (type: string, data: any) => {
			const newState: any = { ...currentState };
			let stateFrag;
			if (!!currentActions[actionsName] && !!currentActions[actionsName][type]) {
				stateFrag = currentActions[actionsName][type](
					newState[stateName],
					data,
					newState
				);
			} else {
				return;
			}
			if(isPromise(stateFrag)) {
				return stateFrag.then((ns: any) => {
					newState[stateName] = ns;
					setState(newState);
					runListeners();
					return Promise.resolve();
				});
			} else {
				newState[stateName] = stateFrag;
				setState(newState);
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
		addModule,
		getModule,
		setModule,
		hasModule,
		replaceAction,
		subscribe,
	};
};
export const StoreContext = createContext({} as any);
export default createStore;
