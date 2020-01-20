import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {InjectStoreModule, useInject} from 'rns-pure';
import Button from '@components/base/Button';
import Input from '@components/base/Input';
import routes from '@client/routes';
import '../theme/test';
import theme from '../business/theme';

import './style.scss';

console.log(theme);

type Props = {
	app: InjectStoreModule;
}

const App: React.FC<{}> = () => {
	// const { state, actions } = app;
	const [{state, actions}] = useInject('app');

	return (
		<>
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to="/page3">page3</Link>
			<br/>
			<Input
				style={{width: 200}}
				type="text"
				value={state.name}
				onChange={actions.update}
			/>
			<Button>test</Button>
			<Switch>
				{routes.map(route => <Route key={route.path} {...route} />)}
			</Switch>
		</>
	);
};

// export default inject<Props>('app')(App);
export default App;
