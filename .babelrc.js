const materialConfig = [
	[
		"babel-plugin-import",
		{
			libraryName: "@material-ui/core",
			// Use "'libraryDirectory': ''," if your bundler does not support ES modules
			libraryDirectory: "esm",
			camel2DashComponentName: false
		},
		"core"
	],
	[
		"babel-plugin-import",
		{
			libraryName: "@material-ui/icons",
			// Use "'libraryDirectory': ''," if your bundler does not support ES modules
			libraryDirectory: "esm",
			camel2DashComponentName: false
		},
		"icons"
	]
];

module.exports = {
	plugins: [
		"lodash",
		...materialConfig,
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-proposal-export-default-from",
		"@babel/plugin-proposal-object-rest-spread",
		// [
		// 	"@babel/plugin-transform-runtime",
		// 	{
		// 		// "absoluteRuntime": false,
		// 		// "corejs": 3,
		// 		// "helpers": true,
		// 		// "regenerator": true,
		// 		// "useESModules": false
		// 	}
		// ],
		"@babel/plugin-proposal-async-generator-functions",
		"@babel/plugin-proposal-function-bind",
		["@babel/plugin-proposal-decorators", { legacy: true }],
		["@babel/plugin-proposal-class-properties", { loose: true }]
	],
	presets: [
		[
			"@babel/preset-env",
			{
				useBuiltIns: 'entry',
				targets: {
					ie: '9',
				},
				corejs: 3,
				modules: false
			}
		],
		"@babel/preset-react",
		"@babel/preset-typescript"
	]
};
