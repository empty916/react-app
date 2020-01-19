module.exports = {
	plugins: [
		'lodash',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-object-rest-spread',
		['@babel/plugin-transform-runtime', {
			// "absoluteRuntime": false,
			// "corejs": 3,
			// "helpers": true,
			// "regenerator": true,
			// "useESModules": false
		}],
		'@babel/plugin-proposal-async-generator-functions',
		'@babel/plugin-proposal-function-bind',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		// [
		// 	"import",
		// 	{
		// 		"libraryName": "antd",
		// 		"style": "css"
		// 	}
		// ]
	],
	presets: [
		[
			'@babel/preset-env',
			{
				// useBuiltIns: 'entry',
				// targets: {
				// 	ie: '9',
				// },
				// corejs: 3,
				modules: false,
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
};
