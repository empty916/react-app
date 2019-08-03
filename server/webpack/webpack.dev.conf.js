const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base.conf');

const {
	getPath,
	getArg,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const { distPath } = require('./config');

const { project, site } = getArg();

const mode = 'development';
const isDev = true;

module.exports = merge(baseConfig, {
	mode,
	// devtool: '#eval-source-map',
	devtool: '#cheap-module-eval-source-map',
	output: {
		chunkFilename: 'js/[name].js',
		filename: 'js/[name].js',
	},
	plugins: [
		// new ForkTsCheckerWebpackPlugin({
		// 	async: false,
		// 	useTypescriptIncrementalApi: true,
		// 	checkSyntacticErrors: true,
		// 	silent: true,
		// 	memoryLimit: 1024,
		// 	compilerOptions: {
		// 		paths: {
		// 			'@common/*': ['common/*'],
		// 			'@utils/*': ['common/utils/*'],
		// 			'@site': [`buildConfig/site/${site}/index.ts`],
		// 			'@site/*': [`buildConfig/site/${site}/*`],
		// 			'@client': [`${project}`],
		// 			'@client/*': [`${project}/*`],
		// 		},
		// 	},
		// }),
	],
	devServer: {
		open: true,
		progress: true,
		// host: '192.168.28.38',
	},
});
