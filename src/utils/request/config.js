const development = {
	server: 'http://localhost:8089/scf-pc',
};
const production = {
	server: '/scf-pc',
};

const config = {
	development,
	production,
};

export default config[process.env.NODE_ENV];
