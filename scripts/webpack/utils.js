const path = require('path');
const webpack = require('webpack');
const minimist = require('minimist');
const glob = require('glob');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
	defaultChannel,
	defaultProject,
} = require('../../buildConfig/defaultConfig');

const getPath = (...$path) => path.join(__dirname, '..', '..', ...$path);

const getArg = () => {
	const arg = minimist(process.argv.slice(2));
	const res = {
		...arg,
		project: arg.project || defaultProject,
		channel: arg.channel || defaultChannel,
		PROJECT_ENV: arg.PROJECT_ENV || process.env.NODE_ENV || 'production',
	};
	return res;
};

module.exports.getPath = getPath;
module.exports.getArg = getArg;

// dll 通用配置 start
const { dllPath, jsPublicPath, cssPublicPath } = require('./config');

const { channel, project } = getArg();
const getAddAssethtmlPluginsConfig = mode => glob.sync(`${dllPath}/${mode}/*.dll.js`).map(
	dllPath => new AddAssetHtmlPlugin({
		filepath: dllPath,
		includeSourcemap: false,
		typeOfAsset: 'js',
		outputPath: 'js',
		publicPath: jsPublicPath.endsWith('/') ? `${jsPublicPath}js/` : `${jsPublicPath}/js/`,
	}),
);
const getDllReferencePluginsConfig = mode => glob.sync(`${dllPath}/${mode}/*.json`).map(
	dllJsonPath => new webpack.DllReferencePlugin({
		// name: 'js/reactDll_1.0.0.dll.js',
		manifest: dllJsonPath,
	}),
);

module.exports.addDllPluginsConfig = mode => [
	// new webpack.DllReferencePlugin({
	// 	// name: 'js/reactDll_1.0.0.dll.js',
	// 	manifest: getPath('server', 'dll', mode, 'reactDll.json'),
	// }),
	...getDllReferencePluginsConfig(mode),
	...getAddAssethtmlPluginsConfig(mode),
];


const cssModule = [
	new RegExp('src/|\modules'),
	new RegExp('src//|\components'),
]
module.exports.createStyleLoader = (mode, isDev = mode === 'development') => [
	{
		test: /\.(s?css)$/,
		include: cssModule,
		use: [
			// isDev ? 'style-loader' :
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: cssPublicPath,
				},
			},
			{
				loader: 'css-loader',
				options: {
					modules: true,
					importLoaders: 1,
					localIdentName: isDev
						? '[local]-[hash:base64:8]'
						: '[hash:base64:16]',
				},
			},
			isDev ? null : {
				loader: 'postcss-loader',
			},
			{
				loader: 'sass-loader',
			},
		].filter(Boolean),
	},
	{
		test: /\.(s?css)$/,
		exclude: cssModule,
		use: [
			// isDev ? 'style-loader' :
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: cssPublicPath,
				},
			},
			{
				loader: 'css-loader',
			},
			isDev ? null : {
				loader: 'postcss-loader',
			},
			{
				loader: 'sass-loader',
			},
		].filter(Boolean),
	},
	{
		test: /\.less$/,
		include: cssModule,
		use: [
			// isDev ? 'style-loader' :
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: cssPublicPath,
				},
			},
			{
				loader: 'css-loader',
				options: {
					modules: true,
					importLoaders: 1,
					localIdentName: isDev
						? '[local]-[hash:base64:8]'
						: '[hash:base64:16]',
				},
			},
			isDev ? null : {
				loader: 'postcss-loader',
			},
			{
				loader: 'less-loader',
			},
		].filter(Boolean),
	},
	{
		test: /\.less$/,
		exclude: cssModule,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: cssPublicPath,
				},
			},
			{
				loader: 'css-loader',
			},
			isDev ? null : {
				loader: 'postcss-loader',
			},
			{
				loader: 'less-loader',
			},
		].filter(Boolean),
	},
];

module.exports.createStylePlugin = (mode, isDev) => new MiniCssExtractPlugin(isDev ? {
	chunkFilename: 'style/[name].[contenthash:8].css',
}: {
	filename: 'style/[name].[contenthash:8].css',
});

// dll 通用配置 end
