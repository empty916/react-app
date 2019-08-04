import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import {store, Provider} from './store';
import App from './App'

const content = (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
ReactDom.render(content, document.querySelector('#app'));
