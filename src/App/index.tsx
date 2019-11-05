import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// import TransitionSwitch from '@common/components/base/TransitionSwitch';
import {
	// inject,
	InjectStoreModule,
	useInject,
} from 'rns-pure';
import routes from '@channel/route';
// import style from '../theme.scss';
import './style.scss';

type Props = {
	app: InjectStoreModule;
}

const App: React.FC<{}> = () => {
	// const { state, actions } = app;
	const [{ state, actions }] = useInject('app');

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
			<Switch>
				{routes.map((route, index) => (
					<Route key={index.toString()} {...route} />
				))}
			</Switch>
		</>
	);
};

// export default inject<Props>('app')(App);
export default App;
