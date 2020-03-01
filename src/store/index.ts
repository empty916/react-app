import {createStore} from 'natur';
import { promiseMiddleware, shallowEqualMiddleware, thunkMiddleware } from 'natur/dist/middlewares';
import devTool from '@redux-devtool';
import appState from '../App/state';
import appActions from '../App/actions';
import user from './user.store';
import lazyModuleConfig from './lazyModule';
import filterUndefinedMiddleware from './filterUndefinedMiddleware';
import fillObjectRestDataMiddleware from './fillObjectRestDataMiddleware';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app: {
		state: appState,
		actions: appActions,
	},
	user,
};

const store = createStore(
	modules,
	lazyModules as any,
	undefined,
	[
		thunkMiddleware,
		promiseMiddleware,
		fillObjectRestDataMiddleware,
		shallowEqualMiddleware,
		filterUndefinedMiddleware,
		devTool,
	],
);

export default store;
