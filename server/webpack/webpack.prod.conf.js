// const webpack = require('webpack');
// const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.base.conf');
const {
	getArg,
	getPath,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const { project, channel } = getArg();
// const mode = 'production';
const mode = process.env.NODE_ENV;
const isDev = false;
module.exports = merge(baseConfig, {
	mode,
	devtool: false,
	output: {
		chunkFilename: 'js/[name].[chunkhash].js',
		filename: 'js/[name].[chunkhash].js',
		publicPath: './',
	},
	resolve: {
		alias: {
			'@redux-devtool': getPath(project, 'store', 'no.devtool.ts'),
		},
	},
	plugins: [
		// 删除文件
		new CleanWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			// tsconfig: './server/tsconfig.json',
			async: false,
			useTypescriptIncrementalApi: true,
			checkSyntacticErrors: true,
			silent: true,
			memoryLimit: 2024,
			compilerOptions: {
				noEmit: false,
				paths: {
					'@channel': [`buildConfig/channel/${channel}/index.ts`],
					'@channel/*': [`buildConfig/channel/${channel}/*`],
					'@inject': ['node_modules/rns-pure/dist/inject.d.ts'],
					'@client': [`${project}`],
					'@client/*': [`${project}/*`],
					'@redux-devtool': [`${project}/store/redux.devtool.ts`],
					'@utils/*': [`${project}/utils/*`],
					'@assets/*': [`${project}/assets/*`],
					'@request': [`${project}/utils/request/index.ts`],
					'@request/*': [`${project}/utils/request/*`],
					"@components/*": [`${project}/components/*`],
				},
			},
		}),
		// new BundleAnalyzerPlugin(),
	],
});
