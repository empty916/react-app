import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import qs from 'qs';
import { inject } from 'natur';
import { redirectWithoutAuth } from './AuthRoute';

function RouteWithSubRoutes({routes, component, user, app, auth, name, ...rest}: any) {
	const Com = component;
	React.useState(() => app.actions.updateLocation({...rest.location, name}));
	const render = React.useCallback(
		(props: any) => (
			<Com {...props} routes={routes || []} />
		),
		[routes],
	);
	if (user.maps.hasAuth(auth)) {
		return (
			<Route
				{...rest}
				component={render}
			/>
		);
	}
	const fromSearch = qs.stringify({
		redirect: `${rest.location.pathname}${rest.location.search}`,
	});
	return (
		<Redirect
			to={{
				pathname: redirectWithoutAuth[auth] || '/',
				search: `?${fromSearch}`,
			}}
		/>
	);
}

export default inject(
	['user', {maps: ['hasAuth']}],
	['app', {}],
)(RouteWithSubRoutes);
