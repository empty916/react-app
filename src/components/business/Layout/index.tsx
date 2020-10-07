import React from 'react';
import { Grid } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import AppMenu from '@biz/Menu';
import Bar from '@biz/Bar';
import { AppRoute } from '@/routes';
import styles from './style.scss';
import AuthRoute from '@/routes/AuthRoute';

const f1 = {
	flex: 1,
};

const Layout: React.FC<{routes: AppRoute[], indexRoute: AppRoute['component']}> = ({routes, indexRoute}) => (
	<Grid container wrap="nowrap">
		<AppMenu />
		<Grid item style={f1} className={styles.right}>
			<Bar />
			<Switch>
				{routes.map((route, index) => (
					<AuthRoute key={route.path || `${index}`} {...route} />
				))}
				{ indexRoute && <Route component={indexRoute} />}
			</Switch>
		</Grid>
	</Grid>
);
export default Layout;
