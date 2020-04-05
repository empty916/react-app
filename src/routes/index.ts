
import loadabel from '@loadable/component';
import Auth from '@/constants/Auth';

export const Index = loadabel(() => import('@/modules/Page1'));


const routes = [
	{
		path: '/page1',
		component: Index,
	},
	{
		path: '/page2',
		component: loadabel(() => import('@/modules/Page2')),
	},
	{
		path: '/page3',
		component: loadabel(() => import('@/modules/Page3')),
	},
	{
		path: '/user',
		component: loadabel(() => import('@/modules/user')),
		auth: Auth.LOGIN_AUTH,
		routes: [
			{
				path: '/user/list',
				component: loadabel(() => import('@/modules/user/list')),
			},
		],
	},
];


export default routes;
