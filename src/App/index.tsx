import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {CssBaseline, AppBar, Toolbar, Typography, Paper} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import materialTheme from '@/service/theme/material';
import AuthRoute from '@/routes/AuthRoute';
import {useInject} from 'natur';
import Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import routes, {Index} from '@/routes';
import '@/theme/test.scss';
import './style.scss';
import IconButton from '@/components/base/IconButton';


const App: React.FC = () => {
	const [{state, actions}] = useInject('user');
	return (
		<ThemeProvider theme={materialTheme}>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Paper>

				<Link to="/page1">page1</Link>
				<Link to="/page2">page2</Link>
				<Link to={{
					pathname: '/page3',
					search: '?id=1',
				}}
				>
					page3
				</Link>
				<br/>
				<Input
					style={{width: 200}}
					type="text"
					value={state.name}
					onChange={actions.updateName}
				/>
				<Button variant='contained' color='primary' auth=''>test</Button>
				<Switch>
					{routes.map((route: any) => <AuthRoute key={route.path || route.key} {...route} />)}
					<Route component={Index} />
				</Switch>
			</Paper>
		</ThemeProvider>
	);
};

// export default inject<Props>('app')(App);
export default App;
