import {createStore} from 'rns-pure';
import { promiseMiddleware, shallowEqualMiddleware, thunkMiddleware } from 'rns-pure/dist/middlewares';
import devTool from '@redux-devtool';
import {autoFillMid} from '@client/store/autoFill';
import appState from '../App/state';
import appActions from '../App/actions';
import {location} from './route.store';
import user from './user.store';
import lazyModuleConfig from '../../server/autoGetModule/lazyLoadModuleConfig';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app: {
		state: appState,
		actions: appActions,
	},
	user,
	locationModule: location,
};

const store = createStore(
	modules,
	lazyModules as any,
	undefined,
	[
		thunkMiddleware,
		promiseMiddleware,
		autoFillMid,
		devTool,
		shallowEqualMiddleware,
	],
);

export default store;
