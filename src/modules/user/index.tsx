import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from '@/routes/AuthRoute';
import { Box } from '@material-ui/core';
import { inject } from '@/store';

const injector = inject('user');

const User: React.FC<typeof injector.type> = ({routes = []}: any) => (
	<Box pl={2}>
		<h1>用户管理</h1>
		<Switch>
			{routes.map((route: any, index: number) => (
				<AuthRoute key={route.path || `${index}`} {...route} />
			))}
		</Switch>
	</Box>
);
export default injector(User);
