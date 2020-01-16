// const path = require('path');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');


const {
	getPath,
	getArg,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const {distPath} = require('./config');

const {project, channel} = getArg();

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
	entry: {
		index: getPath(project, 'index'),
	},
	output: {
		path: distPath,
	},
	resolve: {
		// 设置模块导入规则，import/require时会直接在这些目录找文件
		modules: [
			getPath(`${project}/client/components/business`),
			getPath(`${project}/client/components/base`),
			getPath('common/components/business'),
			getPath('common/components/base'),
			'node_modules',
		],
		// import导入时省略后缀
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
		// import导入时别名
		alias: {
			// common
			'@utils': getPath('common/utils'),
			'@axios': getPath('common/utils/axios'),
			'@styles': getPath('common/utils/styles'),
			'@assets': getPath('common/assets'),
			'@common': getPath('common'),
			'@react-router': getPath('common/route/react-router'),
			'@inject': 'rns-pure/dist/inject',
			// '@inject': getPath('src/rns/inject.tsx'),
			// 'rns-pure': getPath('src/rns/index.ts'),
			'@channel': getPath(`buildConfig/channel/${channel}`),

			// target business
			'@client': getPath(`${project}`),
			'@config': getPath(`${project}/config`),
			'@business': getPath(`${project}/business`),
			'@component': getPath('common/components/base/index.js'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				loader: 'happypack/loader?id=babel',
			},
			...createStyleLoader(mode, isDev),
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'img/[name].[ext]',
							limit: 2048,
							fallback: 'file-loader',
						},
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: 'url-loader',
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: 'url-loader',
			},
			{
				test: /\.html$/,
				use: 'html-loader',
				include: new RegExp(`/${project}`),
				exclude: new RegExp(`/${project}/index.html`),
			},
			{
				test: /\.json$/,
				type: 'javascript/auto',
				use: 'json-loader',
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /\/node_modules/,
					minChunks: 2,
				},
				index: {
					priority: 0,
					test: new RegExp(`/${project}`),
					minChunks: 2,
				},
				theme: {
					priority: 0,
					// test: /theme\.(s)?css$/,
					test: new RegExp(`/${project}/theme/`),
					name: 'theme',
				},
			},
			chunks: 'all',
			minChunks: 1,
			minSize: 0,
			name: true,
		},
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				cache: true,
				// warnings: false,
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
		// WebpackFailPlugin,
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
		createStylePlugin(mode, isDev),
		new HtmlWebpackPlugin({
			title: 'react project template',
			filename: 'index.html',
			template: `./${project}/index.html`,
			// favicon: isDev ? '' : `${project}/favicon.ico`,
			// 防止各channel项目一样时，不生成html文件
			// inlineSource: /theme/,
			cache: false,
			excludeAssets: [/theme/],
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			inject: true,
			// hash: true,
		}),
		new HtmlWebpackExcludeAssetsPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer',
		}),
		// new HtmlWebpackInlineSourcePlugin(),
		// new HtmlWebpackInlineSourcePlugin(),
		...addDllPluginsConfig(mode),
	],
};
