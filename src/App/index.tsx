import React, { useMemo } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import TransitionSwitch from '@common/components/base/TransitionSwitch';
import Inject from '@inject';
import routes from '@channel/route';

import './style.scss';

const App: React.FunctionComponent = (p: any) => {
	const {
		app: { state, actions },
		route: {actions: { changeRoute }},
		history,
		location,
	} = p;
	const $routeState = useMemo(() => ({
		history,
		location,
	}), [history, location]);
	changeRoute($routeState);
	console.log(p);
	return (
		<>
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br />
			<input
				type="text"
				value={state.name}
				onChange={e => actions.update(e.target.value)}
			/>
			<TransitionSwitch>
				{routes.map((route, index) => (
					<Route key={index.toString()} {...route} />
				))}
			</TransitionSwitch>
		</>
	);
};

export default withRouter(Inject('app', 'route')(App));
