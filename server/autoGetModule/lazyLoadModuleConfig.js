
export default {
	modules: {
		page1: () => import(/* webpackChunkName:"page1.tsx" */ '@client/modules/Page1/index.tsx'),
		page1List: () => import(/* webpackChunkName:"page1List.ts" */ '@client/modules/Page1/list/index.ts'),
		page2: () => import(/* webpackChunkName:"page2.tsx" */ '@client/modules/Page2/index.tsx'),
		page3: () => import(/* webpackChunkName:"page3.ts" */ '@client/modules/Page3/index.ts'),
	},
};
