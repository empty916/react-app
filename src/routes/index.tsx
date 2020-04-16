
import React from 'react';
import loadabel from '@loadable/component';
import Auth from '@/constants/Auth';
import Loading from '@base/Skeleton';
// import Loading from '@base/Loading';
import UserWrapper from '@/modules/user';
import delayLoad from 'delay-load';

const _loadabel = (c: () => Promise<any>, time: number = 700) => loadabel(() => delayLoad(c, time), {
	fallback: <Loading />,
});

export const Index = _loadabel(() => import('@/modules/Page1'));


const routes = [
	{
		path: '/page1',
		component: Index,
	},
	{
		path: '/page2',
		component: _loadabel(() => import('@/modules/Page2')),
	},
	{
		path: '/page3',
		component: _loadabel(() => import('@/modules/Page3')),
	},
	{
		path: '/user',
		component: UserWrapper,
		auth: Auth.LOGIN_AUTH,
		routes: [
			{
				path: '/user/list',
				component: _loadabel(() => import('@/modules/user/list')),
			},
		],
	},
];


export default routes;
