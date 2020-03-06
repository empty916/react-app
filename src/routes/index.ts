
import loadabel from '@loadable/component';
import React from 'react';

const routes = [
	{
		path: '/page1',
		component: loadabel(() => import('@/modules/Page1')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page2',
		component: loadabel(() => import('@/modules/Page2')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page3',
		component: loadabel(() => import('@/modules/Page3')) as React.ComponentClass | React.FC,
	},
	{
		path: '/user/list',
		component: loadabel(() => import('@/modules/user/list')) as React.ComponentClass | React.FC,
	},
];

export default routes;
