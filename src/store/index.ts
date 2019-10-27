import {createStore} from 'react-natural-store';
import appState from '../App/state';
import appActions from '../App/actions';
import {location} from './route.store';
import lazyModuleConfig from '../../server/autoGetModule/lazyLoadModuleConfig';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app: {
		state: appState,
		actions: appActions,
	},
	locationModule: location,
};

const LogMiddleware = () => (next: any) => (record: any) => {
	console.log(`${record.moduleName}: ${record.actionName}`, record.state);
	return next(record);
};

const store = createStore(modules, lazyModules as any, undefined, [LogMiddleware]);

export default store;
