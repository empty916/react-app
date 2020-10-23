const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.conf');
const {
	getArg,
	getPath,
} = require('./utils');

const { project, channel } = getArg();
const { jsPublicPath } = require('./config');
// const mode = 'production';
const mode = process.env.NODE_ENV;
const isDev = false;
module.exports = merge(baseConfig, {
	mode,
	devtool: false,
	// devtool: 'source-map',
	output: {
		chunkFilename: 'js/[name].[chunkhash].js',
		filename: 'js/[name].[chunkhash].js',
		publicPath: jsPublicPath,
	},
	resolve: {
		alias: {
			'@redux-devtool': getPath(project, 'store', 'common', 'no.devtool.ts'),
		},
	},
	plugins: [
		// 删除文件
		new CleanWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
	],
});
