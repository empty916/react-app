import React from 'react';
import { Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { inject } from '@/store';
import AuthRoute from '@/routes/AuthRoute';
import { AppRoute } from '@/routes';

const injector = inject('user');

const User: React.FC<typeof injector.type & Pick<AppRoute, 'routes'>> = ({routes = []}) => (
	<Box pl={2}>
		<h1>用户管理</h1>
		<Switch>
			{routes.map((route, index: number) => (
				<AuthRoute key={route.path || `${index}`} {...route} />
			))}
		</Switch>
	</Box>
);
export default injector(User);
