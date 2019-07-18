const merge = require('webpack-merge');


const baseConfig = require('./webpack.base.conf');

const {
	getPath,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

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
	devServer: {
		open: true,
		progress: true,
		// host: '192.168.28.38',
	},
});
