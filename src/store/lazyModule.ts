
export default {
	modules: {
		page1: () => import(/* webpackChunkName:"page1" */ '@/modules/Page1/store'),
		page2: () => import(/* webpackChunkName:"page2" */ '@/modules/Page2/store'),
		page3: () => import(/* webpackChunkName:"page3" */ '@/modules/Page3/store'),
	},
};
