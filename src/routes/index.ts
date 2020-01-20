
import loadabel from '@loadable/component';
import React from 'react';

const routes = [
	{
		path: '/page1',
		component: loadabel(() => import('@client/modules/Page1')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page2',
		component: loadabel(() => import('@client/modules/Page2')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page3',
		component: loadabel(() => import('@client/modules/Page3')) as React.ComponentClass | React.FC,
	},
];

export default routes;
