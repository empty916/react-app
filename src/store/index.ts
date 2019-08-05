import createStore from './createStore';
import appState from '../App/state';
import appActions from '../App/actions';
import lazyModuleConfig from '../../server/autoGetModule/lazyLoadModuleConfig'
const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app: {
		state: appState,
		actions: appActions,
	},
};

export default createStore(modules, lazyModules);
