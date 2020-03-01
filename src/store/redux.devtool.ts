
import { Middleware } from 'natur';
import { createStore } from 'redux';


const root = (state: Object = {}, actions: any):Object => ({
	...state,
	...actions.state,
});

const createMiddleware = ():Middleware => {
	if (process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
		const devMiddleware = (window as any).__REDUX_DEVTOOLS_EXTENSION__();
		const store = createStore(root, devMiddleware);
		return () => next => record => {
			store.dispatch({
				type: `${record.moduleName}/${record.actionName}`,
				state: {
					[record.moduleName]: record.state,
				},
			});
			next(record);
		}
	}
	return () => next => record => next(record);;
}

export default createMiddleware();
