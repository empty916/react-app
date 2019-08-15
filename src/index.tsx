// import 'core-js/stable';
import '@babel/polyfill';
import '@utils/devToolInit';
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import '@mock';
import './store';
import App from './App';

const content = (
	<HashRouter>
		<App />
	</HashRouter>
);
ReactDom.render(content, document.querySelector('#app'));
