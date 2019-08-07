export default [
    {
        path: '/',
        key: 'app',
        breadcrumbName: '首页', // 面包屑的名字
        component: require('@client/app/index'),
        indexRoute: {
            breadcrumbName: 'Home',
            component: require('@client/pages/Home'),
        },
        childRoutes: [

        ],
    },
    {
        path: '/login',
        component: require('@client/layout/Login'),
    }
];
