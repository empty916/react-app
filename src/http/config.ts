const development = {
	server: 'http://localhost:/api',
};
const stg = {
	server: '/api',
};
const production = {
	server: '/api',
};

const config = {
	development,
	stg,
	production,
};

type WithProjectEnv = {
	PROJECT_ENV: 'development' | 'stg' | 'production',
}

export default config[(process.env as WithProjectEnv).PROJECT_ENV];
