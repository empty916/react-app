// import '@babel/polyfill';
import 'core-js';
import 'regenerator-runtime/runtime';
import '@/utils/devToolInit';
import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import history from './routes/history';
import App from './App';
import './store';
import '@/service/user';


const content = (
	<Router history={history}>
		<App />
	</Router>
);
ReactDom.render(content, document.querySelector('#app'));
