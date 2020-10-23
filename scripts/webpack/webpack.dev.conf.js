const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const {
	getPath,
	getArg,
} = require('./utils');

const { jsPublicPath } = require('./config');
const { project, channel, PROJECT_ENV } = getArg();

const mode = 'development';
const isDev = true;

module.exports = merge(baseConfig, {
	mode,
	devtool: 'inline-source-map',
	// devtool: 'source-map',
	output: {
		chunkFilename: 'js/[name].js',
		filename: 'js/[name].js',
		publicPath: jsPublicPath
	},
	resolve: {
		alias: {
			'@redux-devtool': getPath(project, 'store', 'common', 'redux.devtool.ts'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(j|t)s(x)?$/,
				include: getPath(project),
				// include: [getPath(project)],
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre',
				options: {
					// formatter: require('eslint-friendly-formatter'),
					formatter: eslintFormatter,
				},
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			// tsconfig: './server/tsconfig.json',
			async: false,
			useTypescriptIncrementalApi: true,
			checkSyntacticErrors: true,
			silent: true,
			memoryLimit: 1024,
			compilerOptions: {
				paths: {
					'@channel': [`buildConfig/channel/${channel}/index.ts`],
					'@channel/*': [`buildConfig/channel/${channel}/*`],
					"@history": [`${project}/routes/history.ts`],
					'@': [`${project}`],
					'@/*': [`${project}/*`],
					'@redux-devtool': [`${project}/store/common/redux.devtool.ts`],
					"@base/*": [`${project}/components/base/*`],
					"@biz/*": [`${project}/components/business/*`],
				},
			},
		}),
		// new webpack.HotModuleReplacementPlugin({
		// 	// Options...
		// })
	],
	devServer: {
		// open: true,
		progress: false,
		// compress: true,
		quiet: true,
		clientLogLevel: 'none',
		stats: 'errors-only',
		overlay: true,
		noInfo: true,
		port: 8080,
		// hot: true,
		host: '0.0.0.0',
		historyApiFallback: true,
		proxy: {
            '/api': {
                target: 'http://localhost:8090',
            }
        }
	},
});
