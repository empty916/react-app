
import { Middleware } from 'natur';

const md: Middleware = () => next => record => next(record);
export default md;
