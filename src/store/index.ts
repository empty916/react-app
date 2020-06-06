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
import createPersistMiddleware from 'natur-persist';
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

const { middleware: localStorageMiddleware, getData, clearData } = createPersistMiddleware({
	name: '_data',
	time: 300,
	// include: ['user', 'app'],
	// exclude: [/app/i],
	specific: {
		user: 0,
	},
});

const store = createStore(
	modules,
	lazyModules,
	getData(),
	[
		thunkMiddleware,
		promiseMiddleware,
		fillObjectRestDataMiddleware,
		shallowEqualMiddleware,
		filterUndefinedMiddleware,
		devTool,
		localStorageMiddleware,
	],
);


function clearDataAtLoginPage(shouldResetState: boolean = true) {
	if (history.location.pathname.includes('login') && getData()) {
		clearData();
		shouldResetState && store.globalResetStates();
	}
}

clearDataAtLoginPage(false);

history.listen(() => clearDataAtLoginPage());


NaturService.store = store;

export default store;
