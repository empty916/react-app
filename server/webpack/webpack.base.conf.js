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
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

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
			"@history": getPath(`${project}/routes/history`),
			"@biz": getPath(`${project}/components/business`),
			"@styles": getPath(`${project}/utils/styles`),
			"@channel": getPath(`buildConfig/channel/${channel}`)
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
			"process.env.BASE_URL": JSON.stringify(publicPath)
		}),
		new HardSourceWebpackPlugin({
			// cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
			// 果清除了node_modules，则缓存也是如此
			cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
			// Either an absolute path or relative to webpack's options.context.
			// Sets webpack's recordsPath if not already set.
			recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
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
