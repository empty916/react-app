const webpack = require('webpack');
const opn = require('opn');
const WebpackDevServer = require('webpack-dev-server');
const autoGetModule = require('./autoGetModule');
const webpackConfig = require('./webpack/webpack.dev.conf');

// const webpackConfig = createWebpackConfig();
const compiler = webpack(webpackConfig);

compiler.hooks.watchRun.tap('autoGetModule', autoGetModule);

const server = new WebpackDevServer(compiler, {
	...webpackConfig.devServer,
});

const {
	port = 8080,
	host = 'localhost',
	// host = '192.168.1.8',
} = webpackConfig.devServer;

server.listen(port, host, () => {
	// console.log('Starting server on http://localhost:8080');
	opn(`http://${host}:${port}`);
});
