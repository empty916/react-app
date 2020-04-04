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
// import { inject, InjectStoreModule } from 'natur';
import styles from './style.scss';


const f1 = {flex: 1};

const App: React.FC = () => (
	<ThemeProvider theme={materialTheme}>
		<CssBaseline />
		<Grid container wrap='nowrap'>
			<AppMenu />
			<Grid
				item
				style={f1}
				className={styles.right}
			>
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

// export default inject<{app: InjectStoreModule}>('app')(App);
export default App;
