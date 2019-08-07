import {createStore} from '../react-store';
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
// export { default as createStore } from './createStore'
// export { default as inject } from './inject'


