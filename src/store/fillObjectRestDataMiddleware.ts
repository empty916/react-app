import {Middleware} from 'natur';
import {isObj} from 'natur/dist/utils';

const fillObjectRestDataMiddleware: Middleware = ({getState}) => next => record => {
	const currentState = getState();
	if (isObj(record.state) && isObj(currentState)) {
		record = {
			...record,
			state: {
				...currentState,
				...record.state,
			},
		};
	}
	return next(record);
};

export default fillObjectRestDataMiddleware;
