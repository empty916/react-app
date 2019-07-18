// const webpack = require('webpack');
// const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.conf');
const {
	getPath,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const mode = 'production';
const isDev = false;
module.exports = merge(baseConfig, {
	mode,
	devtool: false,
	output: {
		chunkFilename: 'js/[name].[chunkhash].js',
		filename: 'js/[name].[chunkhash].js',
		publicPath: './',
	},
	plugins: [
		// 删除文件
		new CleanWebpackPlugin(),
	],
});
