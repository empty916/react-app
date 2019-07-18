import 'babel-polyfill';
import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, RouteProps } from 'react-router-dom';
import App from './App'

const content = (
	<HashRouter>
		<App />
	</HashRouter>
);

// const content = <App />;
ReactDom.render(content, document.querySelector('#app'));
