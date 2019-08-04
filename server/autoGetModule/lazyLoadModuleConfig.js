
export default {
	modules: {
		page1: () => import(/* webpackChunkName:"page1" */ '@client/pages/Page1/index.ts'),
		page1List: () => import(/* webpackChunkName:"page1List" */ '@client/pages/Page1/list/index.ts'),
		page2: () => import(/* webpackChunkName:"page2" */ '@client/pages/Page2/index.ts'),
		page3: () => import(/* webpackChunkName:"page3" */ '@client/pages/Page3/index.ts'),
	},
	moduleNames: ['Page1', 'Page1/list', 'Page2', 'Page3'],
	formatModuleNames: ['page1', 'page1List', 'page2', 'page3'],
};
