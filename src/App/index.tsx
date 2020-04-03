import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Grid} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import materialTheme from '@/service/theme/material';
import AuthRoute from '@/routes/AuthRoute';
import AppMenu from '@biz/Menu';
import Bar from '@biz/Bar';
import routes, { Index } from '@/routes';
import '@/theme/test.scss';
import styles from './style.scss';

const App: React.FC = () => (
	<ThemeProvider theme={materialTheme}>
		<CssBaseline />
		<Grid container>
			<AppMenu />
			<Grid item style={{flex: 1}} className={styles.right}>
				<Bar />
				<Switch>
					{routes.map((route: any) => (
						<AuthRoute key={route.path || route.key} {...route} />
					))}
					<Route component={Index} />
				</Switch>
			</Grid>
		</Grid>
	</ThemeProvider>
);

// export default inject<Props>('app')(App);
export default App;
