(function devToolInit() {
	if (process.env.NODE_ENV !== 'development') {
		if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
			window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function none() {};
		}
	}
}());
