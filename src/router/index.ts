
import loadabel from '@loadable/component';

const routes = [
	{
		path: '/page1',
		component: loadabel(() => import('../pages/Page1')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page2',
		component: loadabel(() => import('../pages/Page2')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page3',
		component: loadabel(() => import('../pages/Page3')) as React.ComponentClass | React.FC,
	}
];

export default routes;
