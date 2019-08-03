
// import Page1 from '../pages/Page1/view';
// import Page3 from '../pages/Page3';
import loadabel from '@loadable/component';
// const Page1 = () => null;

const routes = [
	{
		path: '/page1',
		component: loadabel(() => import('../pages/Page1/view')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page2',
		component: loadabel(() => import('../pages/Page2/view')) as React.ComponentClass | React.FC,
	},
	{
		path: '/page3',
		component: loadabel(() => import('../pages/Page3')) as React.ComponentClass | React.FC,
	}
];

export default routes;
