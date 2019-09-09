// import 'core-js/stable';
import '@babel/polyfill';
import '@utils/devToolInit';
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import '@mock';
import { Provider } from 'react-natural-store';
import store from './store';
import history from './store/route.store';
import App from './App';

const content = (
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>
);
ReactDom.render(content, document.querySelector('#app'));
