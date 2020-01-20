import {createStore} from 'rns-pure';
import { promiseMiddleware, shallowEqualMiddleware, thunkMiddleware } from 'rns-pure/dist/middlewares';
import devTool from '@redux-devtool';
import appState from '../App/state';
import appActions from '../App/actions';
import user from './user.store';
import lazyModuleConfig from '../../server/autoGetModule/lazyLoadModuleConfig';
import filterUndefinedMiddleware from './filterUndefinedMiddleware';

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
		shallowEqualMiddleware,
		devTool,
		filterUndefinedMiddleware,
	],
);

export default store;
