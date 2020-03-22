import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '@/service/user';

export default function AuthRoute({ children, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={({ location }) => (isLogin() ? (
				children
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: location },
					}}
				/>
			))}
		/>
	);
}
