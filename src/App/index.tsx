import React from 'react';
import { Route, Link } from 'react-router-dom';
import TransitionSwitch from '@common/components/base/TransitionSwitch';
import Inject from '@inject';
import routes from '../router';
import './style.scss';

const App: React.FunctionComponent = ({app: {state, actions}}: any) => {
	console.log('app render');
	return (
		<>
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br/>
			<input type="text" value={state.name} onChange={e => actions.update(e.target.value)} />
			<TransitionSwitch>
				{routes.map((route, index) => <Route key={index} {...route} />)}
			</TransitionSwitch>
		</>
	);
};

export default Inject('app')(App);
