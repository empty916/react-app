
export default {
	modules: {
		page1: () => import(/* webpackChunkName:"page1" */ '@/modules/Page1/index'),
		page2: () => import(/* webpackChunkName:"page2" */ '@/modules/Page2/index'),
		page3: () => import(/* webpackChunkName:"page3" */ '@/modules/Page3/index'),
		threejsDemo1: () => import(/* webpackChunkName:"threejsDemo1" */ '@/modules/threejs/demo1/index'),
	},
};
