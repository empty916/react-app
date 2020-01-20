module.exports = {
	plugins: [
		'lodash',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-default-from',
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
		["rsuite", { "style": true }],
	],
};
