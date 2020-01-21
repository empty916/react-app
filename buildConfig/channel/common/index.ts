

// const { protocol, hostname, port } = window.location;

// const origin:string = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

// const baseUrl:string = `${origin}/factoring-scf-web`;

type TUrlConfig = {
	development: string,
	testing: string,
	production: string,
}

type TConfig = {
	development: string;
	testing: string;
	production: string;
}
const env: keyof TConfig = (process.env.NODE_ENV as keyof TConfig) || 'production';

console.log(process.env.PROJECT_ENV);

const serverUrlConfig: TConfig = {
	// development: '/web/v1',
	development: '',
	testing: '',
	production: '',
	// testing: '/web/v1',
	// production: '/web/v1',
};

export default {
	serverUrl: serverUrlConfig[env],
};
