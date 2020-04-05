import React from 'react';
import { Redirect } from 'react-router-dom';
import { hasAuth } from '@/service/user';
import AUTH from '@/constants/Auth';
import qs from 'query-string';
import { inject } from 'natur';
import RouteWithSubRoutes from './RouteWithSubRoutes';

export const redirectWithoutAuth: any = {
	[AUTH.LOGIN_AUTH]: '/',
};

function AuthRoute({ component, auth, ...rest }: any) {
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
