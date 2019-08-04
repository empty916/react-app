import React from 'react';
import { Route, Link } from 'react-router-dom';
import TransitionSwitch from '../router/TransitionSwitch';
import Inject from '../store/inject';
import routes from '../router';
import './style.scss';

const App: React.FunctionComponent = (p: any) => {
	console.log('app render');
	return (
		<>
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br/>
			{p.app.state.name}
			<TransitionSwitch>
				{routes.map((route, index) => <Route key={index} {...route} />)}
			</TransitionSwitch>
		</>
	);
};

export default Inject('app')(App);
