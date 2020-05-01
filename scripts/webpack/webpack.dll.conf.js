const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const baseConfig = require('./webpack.base.conf');
const { getPath, getArg } = require('./utils');
const { dllPath: dllBasePath } = require('./config');

const { project } = getArg();

// const { channel, project } = getArg();
const dllVersion = '1.0.0';
/**
 * @param {*} mode  = ['development', 'production']
 */
module.exports = mode => {
	const dllPath = path.resolve(dllBasePath, mode);
	// getPath('scripts', 'dll', mode);
	const isDev = mode === 'development';
	return {
		entry: {
			utilsDll: [
				'core-js/stable',
				'regenerator-runtime/runtime',
				'axios',
				'convert-key',
				'delay-load',
				// 'natur-persist',
				// 'natur-service',
				'dayjs',
				'qs',
				// 'color',
				// 'lodash/curry',
				// 'lodash/cloneDeep',
				// 'lodash/fp/pipe',
				// 'lodash/fp/curry',
				// 'react-motion',
			],
			baseDll: [
				'react',
				'react-dom',
				'react-router',
				'react-router-dom',
				'hoist-non-react-statics',
				'history',
				'classnames',
				// 'natur',
				// 'react-redux',
				// 'redux',
				// 'redux-thunk',
				// 'reselect',
			],
			// fpDll: [
			// 	'lodash/curry',
			// 	'lodash/cloneDeep',
			// 	'lodash/fp/pipe',
			// ],
		},
		mode,
		devtool: isDev ? 'eval-source-map' : false,
		output: {
			filename: `[name]_${dllVersion}.dll.js`,
			path: dllPath,
			library: '[name]',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [getPath(project)],
					// loader: 'babel-loader',
					loader: 'happypack/loader?id=babel',
				},
				{
					test: /\.(s?css)$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
						},
						{
							loader: 'sass-loader',
						},
					],
				},
			],
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					parallel: true,
					cache: true,
					terserOptions: {
						output: {
							comments: false,
						},
						compress: {
							warnings: false,
							drop_debugger: true,
							drop_console: true,
						},
					},
				}),
				new OptimizeCSSAssetsPlugin(),
			],
		},
		plugins: [
			new HardSourceWebpackPlugin({
				// cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
				// 果清除了node_modules，则缓存也是如此
				// cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
				// Either an absolute path or relative to webpack's options.context.
				// Sets webpack's recordsPath if not already set.
				// recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
				// configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配 
				// 置构建不同的缓存
				configHash: function(webpackConfig) {
					// node-object-hash on npm can be used to build this.
					return require("node-object-hash")({ sort: false }).hash(
						webpackConfig
					);
				},
				// 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输 
				// 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
				environmentHash: {
					root: process.cwd(),
					directories: [],
					files: ['package-lock.json', 'yarn.lock'],
				},
			}),
			new HappyPack({
				id: 'babel',
				threads: 1,
				loaders: [
					{
						loader: 'babel-loader',
						cacheDirectory: true,
					},
				],
			}),
			new webpack.DllPlugin({
				name: '[name]', // json文件名
				path: path.join(dllPath, '[name].json'), // 生成映射表json文件地址
			}),
			// 删除文件
			new CleanWebpackPlugin(),
		],
	};
};
