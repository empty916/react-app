import React, { useMemo, useEffect } from 'react';
import { Route, Link, withRouter, Switch } from 'react-router-dom';
// import { History } from 'history';
// import TransitionSwitch from '@common/components/base/TransitionSwitch';
import { useInject } from 'react-natural-store';
// import Inject from '@inject';
import routes from '@channel/route';
// import style from '../theme.scss';
import './style.scss';

let RLocation: React.FC<any> | React.ComponentClass<any> = ({location}) => {
	const [locationModule] = useInject('locationModule');
	const $locationState = useMemo(() => location, [location]);
	useEffect(() => { locationModule.actions.update($locationState); }, [$locationState, locationModule.actions]);
	return null;
};
RLocation = withRouter(RLocation);

type Props = {
	className?: string;
}

const App: React.FC<Props> = () => {
	const [{ state, actions }] = useInject('app');

	return (
		<>
			<RLocation />
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br />
			<input
				type="text"
				value={state.name}
				onChange={e => actions.update(e.target.value)}
			/>
			<Switch>
				{routes.map((route, index) => (
					<Route key={index.toString()} {...route} />
				))}
			</Switch>
		</>
	);
};

export default App;
