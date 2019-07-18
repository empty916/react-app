/* eslint-disable */
export default [
	{
		path: '/',
		key: 'app',
		breadcrumbName: '首页', // 面包屑的名字
		component: require('@client/app/index'),
		indexRoute: {
			// path: 'accountOverview',
			breadcrumbName: 'AccountOverview',
			component: require('@client/pages/accountOverview'),
		},
		childRoutes: [
			{
				path: 'eleCertificate/coreCompany/eleCash',
				breadcrumbName: 'EleCertificateCoreCompanyEleCash',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleCertificateCoreCompanyEleCash' */ '@client/pages/eleCertificate/coreCompany/eleCash')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'projectManagement/operate',
				breadcrumbName: 'ProjectManagementOperate',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'projectManagementOperate' */ '@client/pages/projectManagement/operate')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'eleCertificate/coreCompany/signEle/sign',
				breadcrumbName: 'EleCertificateCoreCompanySignEleSign',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleCertificateCoreCompanySignEleSign' */ '@client/pages/eleCertificate/coreCompany/signEle/sign')
						.then(module => cb(null, module));
				},
			},
			// {
			// 	path: 'productManagement/add/stepPricing',
			// 	breadcrumbName: 'ProductManagementAddStepPricing',
			// 	getComponent(location, cb) {
			// 		import(/* webpackChunkName: 'productManagementAddStepPricing' */ '@client/pages/productManagement/add/stepPricing')
			// 			.then(module => cb(null, module));
			// 	},
			// },
			// {
			// 	path: 'productManagement/add/stepProductParams',
			// 	breadcrumbName: 'ProductManagementAddStepProductParams',
			// 	getComponent(location, cb) {
			// 		import(/* webpackChunkName: 'productManagementAddStepProductParams' */ '@client/pages/productManagement/add/stepProductParams')
			// 			.then(module => cb(null, module));
			// 	},
			// },
			{
				path: 'financingAcceptCheckDetail',
				breadcrumbName: 'FinancingAcceptCheckDetail',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingAcceptCheckDetail' */ '@client/pages/financingAcceptCheckDetail')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productManagement/add',
				breadcrumbName: 'ProductManagementAdd',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productManagementAdd' */ '@client/pages/productManagement/add')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productChainManagement',
				breadcrumbName: 'ProductChainManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productChainManagementDetail' */ '@client/pages/productChainManagement/middle')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'messageManagement',
				breadcrumbName: 'MessageManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'messageManagement' */ '@client/pages/messageManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productChainManagement/baseInfoStep',
				breadcrumbName: 'ProductChainManagementBaseInfoStep',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productChainManagementDetail' */ '@client/pages/productChainManagement/baseInfoStep')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'eleCertificate/coreCompany/signEle/list',
				breadcrumbName: 'EleCertificateCoreCompanySignEleList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleCertificateCoreCompanySignEleList' */ '@client/pages/eleCertificate/coreCompany/signEle/list')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productChainManagement/chainClassesStep',
				breadcrumbName: 'ProductChainManagementAdd',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productChainManagementAdd' */ '@client/pages/productChainManagement/chainClassesStep')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'eleCertificate/coreCompany/standBook/list',
				breadcrumbName: 'EleCertificateCoreCompanyStandBookList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleCertificateCoreCompanyStandBookList' */ '@client/pages/eleCertificate/coreCompany/standBook/list')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'eleCertificate/lender/list',
				breadcrumbName: 'EleCertificateLenderList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleCertificateLenderList' */ '@client/pages/eleCertificate/lender/list')
						.then(module => cb(null, module));
				},
			},
			// {
			// 	path: 'projectManagement/add',
			// 	breadcrumbName: 'ProjectManagementAdd',
			// 	getComponent(location, cb) {
			// 		import(/* webpackChunkName: 'projectManagementAdd' */ '@client/pages/projectManagement/add')
			// 			.then(module => cb(null, module));
			// 	}
			// },
			{
				path: 'financingApplication/dataUpload',
				breadcrumbName: 'FinancingApplicationDataUpload',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'FinancingApplicationDataUpload' */ '@client/pages/financingApplication/dataUpload')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingAcceptManageDetail',
				breadcrumbName: 'FinancingAcceptManageDetail',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingAcceptManageDetail' */ '@client/pages/financingAcceptManageDetail')
					.then(module => cb(null, module));
				}
			},
			{
				path: 'customerDetail',
				breadcrumbName: 'CustomerDetail',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'customerDetail' */ '@client/pages/customerDetail')
					.then(module => cb(null, module));
				}
			},
			{
				path: 'projectManagement/list',
				breadcrumbName: 'ProjectManagementList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'projectManagement' */ '@client/pages/projectManagement/list')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingAcceptManage',
				breadcrumbName: 'FinancingAcceptManage',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingAcceptManage' */ '@client/pages/financingAcceptManage')
						.then(module => cb(null, module));
				}
			},
			{
				path: 'productManagement/add',
				breadcrumbName: 'ProductManagementAdd',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productManagementAdd' */ '@client/pages/productManagement/add')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productChainManagement/list',
				breadcrumbName: 'ProductChainManagementList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productChainManagement' */ '@client/pages/productChainManagement/list')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'productManagement/list',
				breadcrumbName: 'ProductManagementList',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'productManagement' */ '@client/pages/productManagement/list')
						.then(module => cb(null, module));
				}
			},
			{
				path: 'payEleDetails',
				breadcrumbName: 'PayEleDetails',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'payEleDetails' */ '@client/pages/payEleDetails')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingApplication/financingApplicationStep',
				breadcrumbName: 'FinancingApplicationFinancingApplicationStep',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingApplicationFinancingApplicationStep' */ '@client/pages/financingApplication/financingApplicationStep')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingApplication/basicInformation',
				breadcrumbName: 'FinancingApplicationBasicInformation',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingApplicationBasicInformation' */ '@client/pages/financingApplication/basicInformation')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'newCustomer',
				breadcrumbName: 'NewCustomer',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'newCustomer' */ '@client/pages/newCustomer')
					.then(module => cb(null, module));
				},
			},
			{
                path: 'customerMangement',
                breadcrumbName: 'CustomerMangement',
                component: require('@client/pages/customerMangement'),
            },
            {
				path: 'enteringCreditManagement',
				breadcrumbName: 'EnteringCreditManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'enteringCreditManagement' */ '@client/pages/enteringCreditManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'accountsPayableManagement',
				breadcrumbName: 'AccountsPayableManagement',
				component: require('@client/pages/accountsPayableManagement'),
			},
			{
				path: 'creditManagement',
				breadcrumbName: 'CreditManagement',
				component: require('@client/pages/creditManagement'),
			},
			{
				path: 'FinancingApplicationReview',
				breadcrumbName: 'FinancingApplicationReview',
				path: 'financing',
				breadcrumbName: 'Financing',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financing' */ '@client/pages/financing')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingApplication',
				breadcrumbName: 'FinancingApplication',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingApplication' */ '@client/pages/financingApplication')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'electronicVoucherManagement',
				breadcrumbName: 'electronicVoucherManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'electronicVoucherManagement' */ '@client/pages/electronicVoucherManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'financingManagement',
				breadcrumbName: 'FinancingManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'financingManagement' */ '@client/pages/financingManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'integratedQuery',
				breadcrumbName: 'IntegratedQuery',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/integratedQuery')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'eleVoucherDetails',
				breadcrumbName: 'EleVoucherDetails',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'eleVoucherDetails' */ '@client/pages/eleVoucherDetails')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'backlogItem',
				breadcrumbName: 'BacklogItem',
				component: require('@client/pages/backlogItem'),
			},
			{
				path: 'accountOverview',
				breadcrumbName: 'AccountOverview',
				component: require('@client/pages/accountOverview'),
			},
			{
				path: 'home',
				breadcrumbName: 'Home',
				component: require('@client/pages/home'),
			},
			{
				path: 'accountsPayableManagement',
				breadcrumbName: 'AccountsPayableManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/accountsPayableManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'accountsPayableView',
				breadcrumbName: 'AccountsPayableView',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/accountsPayableView')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'creditManagement',
				breadcrumbName: 'CreditManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/creditManagement')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'creditView',
				breadcrumbName: 'CreditView',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/creditView')
						.then(module => cb(null, module));
				},
			},
			{
				path: 'enteringAccountsPayable',
				breadcrumbName: 'EnteringAccountsPayable',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/enteringAccountsPayable')
						.then(module => cb(null, module));
				},
			},

			{
				path: 'enteringCreditManagement',
				breadcrumbName: 'EnteringCreditManagement',
				getComponent(location, cb) {
					import(/* webpackChunkName: 'integratedQuery' */ '@client/pages/enteringCreditManagement')
						.then(module => cb(null, module));
				},
			},
		],
	},
];
