
import React from 'react';
import loadabel from '@loadable/component';
import Auth from '@/constants/Auth';
import Loading from '@base/Loading';


const loadabelCommonPage = (c: () => Promise<any>) => loadabel(c, {
	fallback: <Loading />,
});

export const Index = loadabelCommonPage(() => import('@/modules/Page1'));


const routes = [
	{
		path: '/page1',
		component: Index,
	},
	{
		path: '/page2',
		component: loadabelCommonPage(() => import('@/modules/Page2')),
	},
	{
		path: '/page3',
		component: loadabelCommonPage(() => import('@/modules/Page3')),
	},
	{
		path: '/user',
		component: loadabelCommonPage(() => import('@/modules/user')),
		auth: Auth.LOGIN_AUTH,
		routes: [
			{
				path: '/user/list',
				component: loadabelCommonPage(() => import('@/modules/user/list')),
			},
		],
	},
];


export default routes;
