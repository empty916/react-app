import React from 'react';
import Inject from '@inject';
import { Switch } from 'react-router-dom';
import AuthRoute from '@/routes/AuthRoute';
import { Box } from '@material-ui/core';

const User: React.FC<any> = ({routes = []}: any) => (
	<Box pl={2}>
		<h1>用户管理</h1>
		<Switch>
			{routes.map((route: any, index: number) => (
				<AuthRoute key={route.path || `${index}`} {...route} />
			))}
		</Switch>
	</Box>
);
export default Inject('user')(User);
