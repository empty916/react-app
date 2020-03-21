import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {useInject} from 'natur';
import Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import routes from '@/routes';
import '@/theme/test.scss';
import './style.scss';

/* eslint-disable */
const App: React.FC = () => {
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
			<Button color='red'>test</Button>
			<Switch>
				{routes.map(route => <Route key={route.path} {...route} />)}
			</Switch>
		</>
	);
};

// export default inject<Props>('app')(App);
export default App;
