import React from 'react';
import loadabel, { LoadableComponent } from '@loadable/component';
import Auth from '@/constants/common/Auth';
import Loading from '@base/Skeleton';
// import Loading from '@base/Loading';
import UserWrapper from '@/modules/user';
import delayLoad from 'delay-load';
import Layout from '@biz/Layout';

const _loadabel = (c: () => Promise<any>, time: number = 700) => loadabel(() => delayLoad(c, time), {
	fallback: <Loading />,
});

export const Index = _loadabel(() => import('@/modules/Page2'));

export type AppRoute = {
	path: string,
	auth?: string,
	component: React.ComponentClass | LoadableComponent<any> | React.FC<any>,
	indexRoute?: React.ComponentClass | LoadableComponent<any> | React.FC<any>,
	name?: string,
	routes?: AppRoute[],
};

export type Routes = AppRoute[];

const routes:Routes = [
	{
		path: '/login',
		name: 'login',
		component: _loadabel(() => import('@/modules/Page1')),
	},
	{
		path: '/',
		component: Layout,
		// auth: Auth.LOGIN_AUTH,
		indexRoute: Index,
		routes: [
			{
				path: '/page2',
				name: 'page2',
				component: Index,
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
		],
	},

];

export default routes;
