module.exports = {
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-object-rest-spread',
        // '@babel/plugin-transform-runtime',
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
				modules: false,
			},
		],
		['@babel/preset-react'],
	],
};
