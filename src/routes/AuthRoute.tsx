import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import qs from 'qs';
import { inject } from '@/store';
import AUTH from '@/constants/common/Auth';
import { AppRoute } from '.';

const injector = inject(
	'user',
	['app', {}],
);

type AuthRouteProps = AppRoute & typeof injector.type & RouteProps;


export const redirectWithoutAuth = {
	[AUTH.LOGIN_AUTH]: '/login',
};

function AuthRoute({routes, component, indexRoute, user, auth, ...rest}: AuthRouteProps) {
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
		redirect: `${rest.location?.pathname}${rest.location?.search}`,
	});
	return (
		<Redirect
			to={{
				pathname: redirectWithoutAuth[auth!] || '/',
				search: `?${fromSearch}`,
			}}
		/>
	);
}


export default injector(AuthRoute);
