

const { protocol, hostname, port } = window.location;

const origin:string = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const baseUrl:string = `${origin}/factoring-scf-web`;

type TUrlConfig = {
	development: string,
	testing: string,
	production: string,
}

export default {
	serverUrlConfig: {
		// development: '/web/v1',
		development: '/factoring-scf-web/web/v1',
		testing: '/factoring-scf-web/web/v1',
		production: '/factoring-scf-web/web/v1',
		// testing: '/web/v1',
		// production: '/web/v1',
	},
	// fileBaseUrlConfig: {
	// 	development: 'http://10.119.158.76:10000',
	// 	// development: 'http://10.119.152.65:10000',
	// 	// testing: '/web/v1',
	// 	// production: '/web/v1',
	// 	// development: '/web/v1',
	// 	// development: '/factoring-scf-web/web/v1',
	// 	testing: '/factoring-scf-web/web/v1',
	// 	production: '/factoring-scf-web/web/v1',
	// },
	fileBaseUrlConfig: {
		development: '/factoring-scf-web',
		testing: baseUrl,
		production: baseUrl,
	},
	loginFailRedirectUrlConfig: {
		development: '',
		testing: 'http://116.228.151.161:18178/index',
		production: 'https://auth.bestpay.com.cn',
	},
};

// export default {
// 	serverUrlConfig: {
// 		development: '/web/v1',
// 		testing: '/web/v1',
// 		production: '/web/v1',
// 	},
// };

