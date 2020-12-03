
declare module '*.json' {
	const value: any;
	export default value;
}

declare module 'json!*' {
	const value: any;
	export default value;
}

interface Window {
	/**
	 * 浏览器的react调试工具插件
	 */
	__REACT_DEVTOOLS_GLOBAL_HOOK__?: {
		inject: Function
	};
	/**
	 * 浏览器的redux调试工具插件
	 */
	__REDUX_DEVTOOLS_EXTENSION__?: Function;
}
