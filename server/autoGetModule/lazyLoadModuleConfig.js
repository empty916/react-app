
export default {
	modules: {
		page1: () => import(/* webpackChunkName:"page1" */ '@client/modules/Page1/index'),
		page1List: () => import(/* webpackChunkName:"page1List" */ '@client/modules/Page1/list/index'),
		page2: () => import(/* webpackChunkName:"page2" */ '@client/modules/Page2/index'),
		page3: () => import(/* webpackChunkName:"page3" */ '@client/modules/Page3/index'),
	},
};
