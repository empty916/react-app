import {Middleware} from 'natur';

const filterUndefinedMiddleware: Middleware = () => next => record => {
	if (record.state === undefined) {
		return undefined;
	}
	return next(record);
};

export default filterUndefinedMiddleware;
