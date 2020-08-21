import React from 'react';
import { Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import materialTheme from '@/theme/material';
import AuthRoute from '@/routes/AuthRoute';
import history from '@history';
import routes from '@/routes';
import '@/service';
import '@/theme/native/theme.scss';
import '@/service/theme';
import { inject } from '@/store';

const injecter = inject(['router', {}]);

const App: React.FC<typeof injecter.type> = ({router}) => {
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

export default injecter(App);
