import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import qs from 'qs';
import { inject, StoreType } from '@/store';
import { redirectWithoutAuth } from './AuthRoute';


function RouteWithSubRoutes({routes, component, indexRoute, user, auth, ...rest}: any & Pick<StoreType, 'user'>) {
	const Com = component;
	const render = React.useCallback(
		(props: any) => (
			<Com {...props} indexRoute={indexRoute} routes={routes || []} />
		),
		[indexRoute, routes],
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
	'user',
	['app', {}],
)(RouteWithSubRoutes);
