import React from 'react';
import { Route } from 'react-router-dom';


export default function RouteWithSubRoutes(route: any) {
	const render = React.useCallback(
		(props: any) => (
			<route.component {...props} routes={route.routes || []} />
		),
		[route],
	);
	return <Route path={route.path} render={render} />;
}
