const development = {
	server: 'http://localhost:8089/scf-pc',
};
const stg = {
	server: '/scf-pc',
};
const production = {
	server: '/scf-pc',
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
