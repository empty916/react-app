
import { RouteProps } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import App from '../App'


const routes: RouteConfig[] = [
	{
		path: '/page1',
		component: Page1
	},
	{
		path: '/page2',
		component: Page2
	}
];

export default routes;
