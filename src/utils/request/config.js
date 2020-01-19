const development = {
	server: 'http://localhost:8089/scf-pc',
	caServer: 'https://103.28.215.253:10489',
};
const production = {
	server: 'https://scf.jryzt.com',
	caServer: 'https://fjdzzf.foton.com.cn',
};

const config = {
	development,
	production,
};

export default config[process.env.NODE_ENV];
