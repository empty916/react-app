// const path = require('path');
const webpack = require("webpack");
const HappyPack = require("happypack");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


const {
	getPath,
	getArg,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin
} = require("./utils");

const { distPath, publicPath } = require("./config");

const { project, channel, PROJECT_ENV } = getArg();

const mode = process.env.NODE_ENV;
const isDev = mode === "development";

module.exports = {
	entry: {
		index: getPath(project, "index")
	},
	output: {
		path: distPath
	},
	resolve: {
		// 设置模块导入规则，import/require时会直接在这些目录找文件
		modules: [
			getPath(`${project}/components/business`),
			getPath(`${project}/components/base`),
			getPath("common/components/business"),
			getPath("common/components/base"),
			"node_modules"
		],
		// import导入时省略后缀
		extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
		// import导入时别名
		alias: {
			// common
			"@": getPath(`${project}`),
			"@inject": "natur/dist/inject",
			"@base": getPath(`${project}/components/base`),
			"@biz": getPath(`${project}/components/business`),
			"@styles": getPath(`${project}/utils/styles`),
			"@channel": getPath(`buildConfig/channel/${channel}`),
		}
	},
	module: {
		rules: [
			{
				test: /\.(j|t)s(x)?$/,
				exclude: /node_modules/,
				loader: "happypack/loader?id=babel"
			},
			...createStyleLoader(mode, isDev),
			{
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "img/[name].[ext]",
							limit: 2048,
							fallback: "file-loader"
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "svg-sprite-loader",
						options: {
							symbolId: "icon-[name]"
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: "url-loader"
			},
			{
				test: /\.html$/,
				use: "html-loader",
				include: new RegExp(`/${project}`),
				exclude: new RegExp(`/${project}/index.html`)
			},
			{
				test: /\.json$/,
				type: "javascript/auto",
				use: "json-loader"
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /\/node_modules/,
					minChunks: 2
				},
				index: {
					priority: 0,
					test: new RegExp(`/${project}`),
					minChunks: 2
				},
				theme: {
					priority: 0,
					// test: /theme\.(s)?css$/,
					test: new RegExp(`/${project}/theme/`),
					name: "theme"
				}
			},
			chunks: "all",
			minChunks: 1,
			minSize: 0,
			name: true
		},
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				cache: true,
				// warnings: false,
				terserOptions: {
					output: {
						comments: false
					},
					compress: {
						warnings: false,
						drop_debugger: true,
						drop_console: true
					}
				}
			}),
			new OptimizeCSSAssetsPlugin()
		]
	},
	plugins: [
		// WebpackFailPlugin,
		new LodashModuleReplacementPlugin({
			collections: true,
			paths: true
		}),
		new webpack.DefinePlugin({
			"process.env.PROJECT_ENV": JSON.stringify(PROJECT_ENV),
			"process.env.BASE_URL": JSON.stringify(publicPath),
		}),
		new HardSourceWebpackPlugin(),
		new HappyPack({
			id: "babel",
			threads: 1,
			loaders: [
				{
					loader: "babel-loader",
					cacheDirectory: true
				}
			]
		}),
		createStylePlugin(mode, isDev),
		new HtmlWebpackPlugin({
			title: "react project template",
			filename: "index.html",
			template: `./${project}/index.html`,
			// favicon: isDev ? '' : `${project}/favicon.ico`,
			// 防止各channel项目一样时，不生成html文件
			// inlineSource: /theme/,
			cache: false,
			// excludeChunks: ['theme'],
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
				minifyURLs: true
			},
			inject: true
			// hash: true,
		}),
		new HtmlWebpackExcludeAssetsPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "defer"
		}),
		...addDllPluginsConfig(mode)
	]
};
