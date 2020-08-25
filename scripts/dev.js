const webpack = require("webpack");
const chalk = require("chalk");
const WebpackDevServer = require("webpack-dev-server");
const autoGetModule = require("./auto-get-module");
const webpackConfig = require("./webpack/webpack.dev.conf");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');
const chokidar = require('chokidar');
const path = require('path');


// const webpackConfig = createWebpackConfig();
const compiler = webpack(webpackConfig);
// 获取本机电脑IP
function getIP() {
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

const { port = 8080, host = "localhost" } = webpackConfig.devServer;

compiler.hooks.invalid.tap("invalid", function() {
	clearConsole();
	console.log(chalk.yellow.bold("🍼 编译中..."));
});

chokidar.watch(path.resolve(__dirname, '../src/modules'))
	.on('all', autoGetModule);

let hasOpenedBrowser = false;

compiler.hooks.done.tap("done", function(stats) {
	var rawMessages = stats.toJson({}, true);
	var messages = formatWebpackMessages(rawMessages);
	if (!messages.errors.length && !messages.warnings.length) {
		console.log(chalk.green.bold("🎉 编译成功!\n"));
		setTimeout(() => {
			console.log('本机网络: ' + chalk.cyan.bold(`http://localhost:${port}`));
			console.log('局域网络: ' + chalk.cyan.bold(`http://${getIP()}:${port}`));
		}, 0)
	}
	if (messages.errors.length) {
		console.log(chalk.red.bold('❌ 编译失败！'));
		messages.errors.forEach(e => console.log(e));
		return;
	}
	if (messages.warnings.length) {
		console.log(chalk.yellow.bold("🙅 编译警告！"));
		messages.warnings.forEach(w => console.log(w));
	}
	if (!hasOpenedBrowser) {
		hasOpenedBrowser = true;
		setTimeout(() => {
			openBrowser(`http://localhost:${port}`);
		}, 0);
	}
});

// compiler.hooks.watchRun.tap("autoGetModule", autoGetModule);

const server = new WebpackDevServer(compiler, {
	...webpackConfig.devServer
});

server.listen(port, host, () => {
	clearConsole();
	console.log(chalk.yellow.bold("🍼 编译中..."));
});
