import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import AuthRoute from '@/routes/AuthRoute';
import {useInject} from 'natur';
import _Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import routes, {Index} from '@/routes';
import Auth from '@biz/Authority';
import '@/theme/test.scss';
import './style.scss';

const Button = Auth.createAuthFilterHOC(_Button);

/* eslint-disable */
const App: React.FC = () => {
	const [{state, actions}] = useInject('user');
	return (
		<>
			<Link to="/page1">page1</Link>
			<Link to="/page2">page2</Link>
			<Link to={{
				pathname: '/page3',
				search: '?id=1'
			}}>page3</Link>
			<br/>
			<Input
				style={{width: 200}}
				type="text"
				value={state.name}
				onChange={actions.updateName}
			/>
			<Button auth='login' color='red'>test</Button>
			<Switch>
				{routes.map((route: any) => <AuthRoute key={route.path || route.key} {...route} />)}
				<Route component={Index} />
			</Switch>
		</>
	);
};

// export default inject<Props>('app')(App);
export default App;
