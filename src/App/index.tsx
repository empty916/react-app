import React from 'react';
import { Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import materialTheme from '@/service/theme/material';
import AuthRoute from '@/routes/AuthRoute';
import history from '@history';
import routes from '@/routes';
import '@/theme/test.scss';
import { InjectStoreModule, inject } from 'natur';

var;

const App: React.FC<{router: InjectStoreModule}> = ({router}) => {
	React.useState(() => {
		router.actions.updateLocation(history.location);
		history.listen(router.actions.updateLocation);
	});
	return (
		<ThemeProvider theme={materialTheme}>
			<CssBaseline />
			<Switch>
				{routes.map((route: any, index) => (
					<AuthRoute key={route.path || `${index}`} {...route} />
				))}
			</Switch>
		</ThemeProvider>
	);
};

export default inject<{router: InjectStoreModule}>(['router', {}])(App);
