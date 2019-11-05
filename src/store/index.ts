import {createStore} from 'rns-pure';
import { promiseMiddleware, shallowEqualMiddleware } from 'rns-pure/dist/middlewares';
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

const LogMiddleware = () => (next: any) => (record: any) => {
	console.log(`${record.moduleName}: ${record.actionName}`, record.state);
	return next(record);
};

const store = createStore(
	modules,
	lazyModules as any,
	undefined,
	[
		LogMiddleware,
		promiseMiddleware,
		shallowEqualMiddleware,
	],
);

export default store;
