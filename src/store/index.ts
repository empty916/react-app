import { createStore } from 'natur';
import {
	promiseMiddleware,
	shallowEqualMiddleware,
	thunkMiddleware,
	filterUndefinedMiddleware,
	fillObjectRestDataMiddleware,
} from 'natur/dist/middlewares';
import devTool from '@redux-devtool';
import app from '../App/store';
import user from './user.store';
import lazyModuleConfig from './lazyModule';

const { modules: lazyModules } = lazyModuleConfig;

const modules = {
	app,
	user,
};

const store = createStore(modules, lazyModules as any, undefined, [
	thunkMiddleware,
	promiseMiddleware,
	fillObjectRestDataMiddleware,
	shallowEqualMiddleware,
	filterUndefinedMiddleware,
	devTool,
]);

export default store;
