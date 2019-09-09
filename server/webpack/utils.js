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
	};
	return res;
};

module.exports.getPath = getPath;
module.exports.getArg = getArg;

// dll 通用配置 start
const { dllPath } = require('./config');

const { channel, project } = getArg();
const getAddAssethtmlPluginsConfig = mode => glob.sync(`${dllPath}/${mode}/*.dll.js`).map(
	dllPath => new AddAssetHtmlPlugin({
		filepath: dllPath,
		includeSourcemap: false,
		typeOfAsset: 'js',
		outputPath: 'js',
		publicPath: './js',
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

module.exports.createStyleLoader = (mode, isDev = mode === 'development') => [
	{
		test: /\.(s?css)$/,
		exclude: /\/node_modules/,
		use: [
			// isDev ? 'style-loader' :
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: isDev ? '' : '../',
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
		include: /\/node_modules/,
		use: [
			// isDev ? 'style-loader' :
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					publicPath: isDev ? '' : '../',
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
];

module.exports.createStylePlugin = (mode, isDev) => new MiniCssExtractPlugin({
	filename: 'style/[name].[contenthash:8].css',
	// filename: ({
	// 	chunk: {
	// 		name,
	// 		contentHash: { javascript },
	// 	},
	// }) => {
	// 	if (isDev) {
	// 		return `style/${name}.css`;
	// 	}
	// 	if (name === 'theme') {
	// 		return 'style/theme.css';
	// 	}
	// 	return `style/${name}.${javascript.slice(0, 8)}.css`;
	// },
	chunkFilename: 'style/[name].[contenthash:8].css',
	// chunkFilename: (...arg) => {
	// 	const {
	// 		chunk: {
	// 			name,
	// 			id,
	// 			contentHash: { javascript },
	// 		},
	// 	} = arg[0];
	// 	if (isDev) {
	// 		console.log(`style/${name || id}.css`);
	// 		return `style/${name || id}.css`;
	// 	}
	// 	if (name === 'theme') {
	// 		return 'style/theme.css';
	// 	}
	// 	console.log(`style/${name || id}.${javascript.slice(0, 8)}.css`);
	// 	return `style/${name || id}.${javascript.slice(0, 8)}.css`;
	// },
});

// dll 通用配置 end
