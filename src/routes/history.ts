import {
	// createHashHistory,
	createBrowserHistory,
} from 'history';

// const currentHistory = createHashHistory();
const currentHistory = createBrowserHistory({
	basename: '/admin/',
});

export default currentHistory;
