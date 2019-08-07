import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './store';
import App from './App'


const content = (
	<HashRouter>
		<App />
	</HashRouter>
);
ReactDom.render(content, document.querySelector('#app'));
