import { createStore } from 'natur';
import {
	promiseMiddleware,
	shallowEqualMiddleware,
	thunkMiddleware,
	filterUndefinedMiddleware,
	fillObjectRestDataMiddleware,
} from 'natur/dist/middlewares';
import devTool from '@redux-devtool';
import history from '@history';
import NaturService from 'natur-service';
import { localStorageMiddleware, getData, clearData } from './persist';
import app from '../App/store';
import user from './user.store';
import router from './router.store';
import lazyModuleConfig from './lazyModule';
import { ModuleType, PromiseModuleType } from './ts-utils';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app,
	user,
	router,
};

export type StoreModulesType = {
	[k in keyof typeof modules]: ModuleType<(typeof modules)[k]>;
} & {
	[k in keyof typeof lazyModules]: PromiseModuleType<(typeof lazyModules)[k]>;
}

const store = createStore(modules, lazyModules, getData(), [
	thunkMiddleware,
	promiseMiddleware,
	fillObjectRestDataMiddleware,
	shallowEqualMiddleware,
	filterUndefinedMiddleware,
	devTool,
	localStorageMiddleware,
]);

function clearDataAtLoginPage(shouldResetState: boolean = true) {
	if (history.location.pathname.includes('login') && getData()) {
		clearData();
		shouldResetState && store.globalResetStates({ exclude: [/^router$/] });
	}
}

clearDataAtLoginPage(false);

history.listen(() => clearDataAtLoginPage());

NaturService.store = store;

export default store;
