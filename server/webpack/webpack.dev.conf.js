const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./webpack.base.conf');

const {
	getPath,
	getArg,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const { distPath } = require('./config');

const { project, channel } = getArg();

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
		// host: '192.168.28.38',
	},
});
