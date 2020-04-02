// import 'core-js/stable';
import '@babel/polyfill';
import '@/utils/devToolInit';
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import './store';
import history from './routes/history';
import App from './App';

const content = (
	<Router history={history}>
		<App />
	</Router>
);
ReactDom.render(content, document.querySelector('#app'));
