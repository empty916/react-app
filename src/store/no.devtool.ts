
import { Middleware } from 'rns-pure';

const md: Middleware = () => next => record => next(record);
export default md;
