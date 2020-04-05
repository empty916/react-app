const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./webpack.base.conf');

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
	output: {
		chunkFilename: 'js/[name].js',
		filename: 'js/[name].js',
		publicPath: jsPublicPath
	},
	resolve: {
		alias: {
			'@redux-devtool': getPath(project, 'store', 'redux.devtool.ts'),
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
					formatter: require('eslint-friendly-formatter'),
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
					'@inject': ['node_modules/natur/dist/inject.d.ts'],
					'@': [`${project}`],
					'@/*': [`${project}/*`],
					'@redux-devtool': [`${project}/store/redux.devtool.ts`],
					"@base/*": [`${project}/components/base/*`],
					"@biz/*": [`${project}/components/business/*`],
				},
			},
		}),
		new StyleLintPlugin({
			// configFile: getPath('server', '.stylelintrc.js'),
			files: `${project}/**/*.scss`,
			failOnError: false,
			quiet: true,
			syntax: 'scss',
			cache: true,
			fix: true,
		}),
	],
	devServer: {
		open: true,
		progress: true,
		port: 8080,
		host: 'localhost',
		historyApiFallback: true,
		proxy: {
            '/api': {
                target: 'http://localhost:8090',
            }
        }
	},
});
