import createStore from './createStore';
import Provider from './Provider';
import appState from '../App/state';
import appActions from '../App/actions';

const store = createStore({appActions}, {appState});

export {
	store,
	Provider,
}
