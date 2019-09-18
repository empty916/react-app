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

const store = createStore(modules, lazyModules);

export default store;
