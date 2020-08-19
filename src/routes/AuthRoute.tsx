import React from 'react';
import { Redirect } from 'react-router-dom';
import AUTH from '@/constants/Auth';
import qs from 'qs';
import { inject } from '@/store';
import RouteWithSubRoutes from './RouteWithSubRoutes';

export const redirectWithoutAuth: any = {
	[AUTH.LOGIN_AUTH]: '/login',
};

function AuthRoute({ component, auth, user, ...rest }: any) {
	const { hasAuth } = user.maps;
	if (hasAuth(auth)) {
		return (
			<RouteWithSubRoutes
				{...rest}
				component={component}
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


export default inject(['user', {maps: ['hasAuth']}])(AuthRoute);
// export default AuthRoute;
