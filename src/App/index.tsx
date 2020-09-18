import React from 'react';
import { Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { create } from 'jss';
import defaultUnit from 'jss-plugin-default-unit';
import unitConfig from '@/theme/unit';
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import materialTheme from '@/theme/material';
import AuthRoute from '@/routes/AuthRoute';
import history from '@history';
import routes from '@/routes';
import '@/service';
import '@/theme/native/theme.scss';
import '@/service/theme';
import { inject } from '@/store';

const injector = inject(['router', {}]);

const plugins = jssPreset().plugins.slice();
plugins[4] = defaultUnit(unitConfig as any);

const jss = create({
	plugins,
	insertionPoint: document.getElementById('jss-insertion-point')!,
});


const App: React.FC<typeof injector.type> = ({router}) => {
	React.useState(() => {
		router.actions.updateLocation(history.location);
		history.listen(router.actions.updateLocation);
	});

	return (
		<StylesProvider jss={jss}>
			<ThemeProvider theme={materialTheme}>
				<CssBaseline />
				<Switch>
					{routes.map((route: any, index) => (
						<AuthRoute key={route.path || `${index}`} {...route} />
					))}
				</Switch>
			</ThemeProvider>
		</StylesProvider>
	);
};

export default injector(App);
