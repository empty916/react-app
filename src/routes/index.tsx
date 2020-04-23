
import React from 'react';
import loadabel, { LoadableComponent } from '@loadable/component';
import Auth from '@/constants/Auth';
import Loading from '@base/Skeleton';
// import Loading from '@base/Loading';
import UserWrapper from '@/modules/user';
import delayLoad from 'delay-load';

const _loadabel = (c: () => Promise<any>, time: number = 700) => loadabel(() => delayLoad(c, time), {
	fallback: <Loading />,
});

export const Index = _loadabel(() => import('@/modules/Page1'));

type Routes = {
	path: string,
	auth?: string,
	component: React.ComponentClass | LoadableComponent<any>,
	name?: string,
	routes?: Routes,
}[]

const routes:Routes = [
	{
		path: '/page1',
		name: 'index',
		component: Index,
	},
	{
		path: '/page2',
		name: 'page2',
		component: _loadabel(() => import('@/modules/Page2')),
	},
	{
		path: '/page3',
		name: 'page3',
		component: _loadabel(() => import('@/modules/Page3')),
	},
	{
		path: '/user',
		name: 'user',
		component: UserWrapper,
		auth: Auth.LOGIN_AUTH,
		routes: [
			{
				path: '/user/list',
				name: 'user-list',
				component: _loadabel(() => import('@/modules/user/list')),
			},
		],
	},
];


export default routes;
