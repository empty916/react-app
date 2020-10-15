import React from 'react';
import { Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { create } from 'jss';
import defaultUnit from 'jss-plugin-default-unit';
import unitConfig from '@/theme/unit';
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import materialTheme from '@/theme/material';
import history from '@history';
import routes from '@/routes';
import '@/service';
import '@/theme/native/theme.scss';
import '@/service/common/theme';
import { inject } from '@/store';
import DateFnsUtils from '@date-io/date-fns';
import zhLocale from 'date-fns/locale/zh-CN';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Toast from '@/components/base/Toast';
import Loading from '@/components/base/Loading';
import AuthRoute from '@/routes/AuthRoute';

const injector = inject(['router', {}]);

const plugins = jssPreset().plugins.slice();
plugins[4] = defaultUnit(unitConfig);

const jss = create({
	plugins,
	insertionPoint: document.getElementById('jss-insertion-point')!,
});

class LocalizedUtils extends DateFnsUtils {
	dateFormat = 'yyyy-MM-dd';

	yearFormat = 'yyyy';

	yearMonthFormat = 'yyyy-MM';

	dateTime12hFormat= 'yyyy-MM-dd HH:mm:ss';

	dateTime24hFormat= 'yyyy-MM-dd HH:mm:ss';
}


const App: React.FC<typeof injector.type> = ({router}) => {
	React.useState(() => {
		router.actions.updateLocation(history.location);
		history.listen(router.actions.updateLocation);
	});

	return (
		<MuiPickersUtilsProvider utils={LocalizedUtils} locale={zhLocale}>
			<StylesProvider jss={jss}>
				<ThemeProvider theme={materialTheme}>
					<CssBaseline />
					<Switch>
						{routes.map((route, index) => (
							<AuthRoute key={route.path || `${index}`} {...route} />
						))}
					</Switch>
					<Toast />
					<Loading />
				</ThemeProvider>
			</StylesProvider>
		</MuiPickersUtilsProvider>
	);
};

export default injector(App);
