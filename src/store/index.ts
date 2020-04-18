import { createStore } from 'natur';
import {
	promiseMiddleware,
	shallowEqualMiddleware,
	thunkMiddleware,
	filterUndefinedMiddleware,
	fillObjectRestDataMiddleware,
} from 'natur/dist/middlewares';
import devTool from '@redux-devtool';
import NaturService from 'natur-service';
import createPersistMiddleware from 'natur-persist';
import app from '../App/store';
import user from './user.store';
import lazyModuleConfig from './lazyModule';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app,
	user,
};

const { middleware: localStorageMiddleware, getData } = createPersistMiddleware({
	name: '_data',
	time: 300,
	// include: ['user', 'app'],
	// exclude: [/page/i, 'app'],
	specific: {
		user: 0,
	},
});

const store = createStore(
	modules,
	lazyModules as any,
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
NaturService.store = store;

export default store;
