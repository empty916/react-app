const changePageName = (newPageName: string) => ({
	pageName: newPageName,
});
const asyncChangePageName = (newPageName: string) => new Promise(res => {
	setTimeout(() => {
		res({
			pageName: newPageName,
		});
	}, 3000);
});

export default {
	changePageName,
	asyncChangePageName,
};
