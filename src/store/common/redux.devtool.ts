
import { createStore } from 'redux';


const root = (state: Object = {}, actions: any):Object => ({
	...state,
	...actions.state,
});

const createMiddleware = () => {
	if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
		const devMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__();
		const store = createStore(root, devMiddleware);
		return () => (next: any) => (record: any) => {
			store.dispatch({
				type: `${record.moduleName}/${record.actionName}`,
				state: {
					[record.moduleName]: record.state,
				},
			});
			return next(record);
		}
	}
	return () => (next: any) => (record: any) => next(record);;
}

export default createMiddleware();
