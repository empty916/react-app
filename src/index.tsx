import 'babel-polyfill';
import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import { renderToString } from 'react-dom/server';
import { HashRouter, Route, RouteProps } from 'react-router-dom';
import {store, Provider} from './store';
import App from './App'

const content = (
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
// const content = <App />;
ReactDom.render(content, document.querySelector('#app'));
