

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
		development: '',
		testing: '',
		production: '',
		// testing: '/web/v1',
		// production: '/web/v1',
	},
};

