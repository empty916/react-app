import createStore from './createStore';
import appState from '../App/state';
import appActions from '../App/actions';

export default createStore({appActions}, {appState})
