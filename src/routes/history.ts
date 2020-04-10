import {
	// createHashHistory,
	createBrowserHistory,
} from 'history';

// const currentHistory = createHashHistory();
const currentHistory = createBrowserHistory({
	basename: process.env.BASE_URL,
});
export default currentHistory;
