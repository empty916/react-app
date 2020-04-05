import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';


export default ({routes = []}: any) => (
	<>
		111
		<Switch>
			{routes.map((route: any, index: number) => (
				<AuthRoute key={route.path || `${index}`} {...route} />
			))}
		</Switch>
	</>
);
