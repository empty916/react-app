import { createStore, createInject } from 'natur';
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

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app,
	user,
	router,
};


const store = createStore(modules, lazyModules, getData(), [
	thunkMiddleware,
	promiseMiddleware,
	fillObjectRestDataMiddleware,
	shallowEqualMiddleware,
	filterUndefinedMiddleware,
	devTool,
	localStorageMiddleware,
]);

export type StoreType = typeof store.type;


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
export const inject = createInject({
	storeGetter: () => store,
});
