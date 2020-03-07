export default [
	{
		path: '/',
		key: 'app',
		breadcrumbName: '首页', // 面包屑的名字
		component: require('@/app/index'),
		indexRoute: {
			breadcrumbName: 'Home',
			component: require('@/pages/Home'),
		},
		childRoutes: [],
	},
	{
		path: '/login',
		component: require('@/layout/Login'),
	},
];
