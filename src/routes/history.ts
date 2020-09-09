import {
	// createHashHistory,
	createBrowserHistory,
	// createMemoryHistory,
} from 'history';

// const currentHistory = createHashHistory();
// const currentHistory = createMemoryHistory();
const currentHistory = createBrowserHistory({
	// basename: '/web',
	basename: process.env.BASE_URL,
});
export default currentHistory;
