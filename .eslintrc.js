// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	env: {
		browser: true,
		// "commonjs": true,
		es6: true,
	},
	extends: [
		// "eslint:recommended",
		// "plugin:react/recommended"
		'airbnb',
	],
	// extends: "eslint:recommended",
	globals: {
		$: true,
		process: true,
		__dirname: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		//es6的module模式
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		ecmaVersion: 11, // es2020
	},
	settings: {
		'import/ignore': ['node_modules', 'DynamicForm', '.s?css', '@w*'],
	},
	plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],

	overrides: [{
		files: ['**/*.ts', '**/*.tsx'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaVersion: 11,
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
			},
			// typescript-eslint specific options
			warnOnUnsupportedTypeScriptVersion: true,
		},
		plugins: ['@typescript-eslint'],
		// If adding a typescript-eslint version of an existing ESLint rule,
		// make sure to disable the ESLint rule here.
		rules: {
			// TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
			'default-case': 'off',
			// 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
			'no-dupe-class-members': 'off',
			// Add TypeScript specific rules (and turn off ESLint equivalents)
			// '@typescript-eslint/no-angle-bracket-type-assertion': 'warn',
			'no-array-constructor': 'off',
			'@typescript-eslint/no-array-constructor': 'warn',
			'@typescript-eslint/no-namespace': 'error',
			'no-unused-vars': 1,
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'none',
					ignoreRestSiblings: true,
				},
			],
			'no-useless-constructor': 'off',
			'@typescript-eslint/no-useless-constructor': 'warn',
		},
	}],
	rules: {
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'import/order': 0,
		'import/prefer-default-export': 0,

		'react/prop-types': 0,
		'react/jsx-filename-extension': 0,
		'react/prefer-stateless-function': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-tag-spacing': 0,
		'react/jsx-props-no-spreading': 0,
		'react/require-default-props': 0,
		// // @off 同构应用需要在 didMount 里写 setState
		'react/no-did-mount-set-state': 0,
		'react/button-has-type': 0,
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

		'jsx-a11y/anchor-is-valid': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/mouse-events-have-key-events': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/aria-role': 0,
		'jsx-a11y/alt-text': 0,
		'jsx-a11y/heading-has-content': 0,
		'jsx-a11y/anchor-has-content': 0,

		'no-return-assign': 0,
		'consistent-return': 0,
		'no-console': 0,
		'no-plusplus': 0,
		'linebreak-style': 0,
		'no-unused-expressions': 0,
		// 0、1、2分别表示不开启检查、警告、错误
		indent: [2, 'tab', { SwitchCase: 1 }], // tab缩进
		// 圈复杂度
		complexity: [2, 9],
		'max-params': [2, 7],
		'max-depth': [2, 4],
		'no-multiple-empty-lines': 0,
		'max-len': [
			'error',
			{
				code: 150,
				tabWidth: 4,
				ignoreComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		'no-tabs': 0,
		'object-curly-newline': [
			0,
			{
				ObjectExpression: 'always',
				ObjectPattern: { multiline: true },
				ImportDeclaration: 'never',
				ExportDeclaration: {
					multiline: true,
				},
			},
		],
		'object-curly-spacing': 0,

		'arrow-parens': [2, 'as-needed'],
		// 最大回调层数
		'max-nested-callbacks': [2, 3],
		'no-unused-vars': [
			1,
			{
				argsIgnorePattern: '^React',
				varsIgnorePattern: '[Rr]eact|[Ss]tyle',
			},
		],
		'no-extra-boolean-cast': 0,
		'array-callback-return': 0,
		'no-param-reassign': 0,
		'jsx-quotes': [0, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号
		'no-underscore-dangle': 0,
		'quote-props': 0,
		// "no-native-reassign": 2,//不能重写native对象
		// // if while function 后面的{必须与if在同一行，java风格。
		// "brace-style": [2, "1tbs", { "allowSingleLine": true }],
		// // 双峰驼命名格式
		// "camelcase": 2,
		// // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
		// "computed-property-spacing": [2,"never"],
		// //允许箭头函数可以省略小括号
		// 'arrow-parens': 0,
		// 'no-extra-semi': 2, // 不允许多余的分号
		// //允许使用async-await函数
		// 'generator-star-spacing': 0,
		// //在开发环境开启debugger功能,生产环境禁止使用debugger
		// 'no-debugger': process.env.NODE_ENV === 'development' ? 0 : 2,
		// "quotes": [2, "single"], //单引号
		// "no-var": 2, //对var警告
		// "semi": ["error", "always"], //不强制使用分号
		// "no-irregular-whitespace": 0, //不规则的空白不允许
		// "no-alert": 2, //禁止使用alert confirm prompt
		// "no-lone-blocks": 0, //禁止不必要的嵌套块
		// "no-class-assign": 2, //禁止给类赋值
		// "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
		// "no-const-assign": 2, //禁止修改const声明的变量
		// "no-delete-var": 2, //不能对var声明的变量使用delete操作符
		// "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
		// "no-duplicate-case": 2, //switch中的case标签不能重复
		// "no-dupe-args": 2, //函数参数不能重复
		// "no-empty": 2, //块语句中的内容不能为空
		// "no-func-assign": 2, //禁止重复的函数声明
		// "no-invalid-this": 0, //禁止无效的this，只能用在构造器，类，对象字面量
		// "no-redeclare": 2, //禁止重复声明变量
		// "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
		// "no-this-before-super": 0, //在调用super()之前不能使用this或super
		// "no-undef": 2, //不能有未定义的变量
		// "no-use-before-define": 2, //未定义前不能使用
		// // "camelcase": 0, //强制驼峰法命名
		// "no-mixed-spaces-and-tabs": 0, //禁止混用tab和空格
		// "prefer-arrow-callback": 0, //比较喜欢箭头回调
		// "arrow-spacing": 0, //=>的前/后括号
		//
		// // 禁止在 componentDidMount 里面使用 setState

		// // 禁止在 componentDidUpdate 里面使用 setState
		// 'react/no-did-update-set-state': 2,
		// // 禁止拼写错误

		// 'react/no-typos': 2,
		// // 禁止使用字符串 ref
		// 'react/no-string-refs': 2,
		// // @fixable 禁止出现 HTML 中的属性，如 class
		// 'react/no-unknown-property': 2,
		// // 禁止出现未使用的 propTypes
		// // @off 不强制要求写 propTypes
		// 'react/no-unused-prop-types': 2,
		// // 出现 jsx 的地方必须 import React
		// // @off 已经在 no-undef 中限制了
		// 'react/react-in-jsx-scope': 0,
		// // 非 required 的 prop 必须有 defaultProps
		// // @off 不强制要求写 propTypes
		// 'react/require-default-props': 0,
		// // render 方法中必须有返回值
		// 'react/require-render-return': 2,
		// // @fixable 组件内没有 children 时，必须使用自闭和写法
		// // @off 没必要限制
		// 'react/self-closing-comp': 0,
		// // style 属性的取值必须是 object
		// 'react/style-prop-object': 2,
		// // HTML 中的自闭和标签禁止有 children
		// 'react/void-dom-elements-no-children': 2,
		// // 数组中的 jsx 必须有 key
		// 'react/jsx-key': 2,
		// // 禁止在 jsx 中使用像注释的字符串
		// 'react/jsx-no-comment-textnodes': 2,
		// // 禁止出现重复的 props
		// 'react/jsx-no-duplicate-props': 2,
		// // 禁止使用未定义的 jsx elemet
		// 'react/jsx-no-undef': 2,
		// // jsx 文件必须 import React
		// 'react/jsx-uses-react': 2,
		// // 定义了的 jsx element 必须使用
		// 'react/jsx-uses-vars': 2,
		// // @fixable 多行的 jsx 必须有括号包起来
		// // @off 没必要限制
		// 'react/jsx-wrap-multilines': 2,
		// "react/no-array-index-key": 2, // 遍历出来的节点必须加key
		// "react/no-children-prop": 2, // 禁止使用children作为prop
		// "react/no-direct-mutation-state": 2, // 禁止直接this.state = 方式修改state 必须使用setState
	},
};
