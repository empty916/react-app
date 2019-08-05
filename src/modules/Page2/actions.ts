const changePageName = (newPageName: string, ...arg: any[]) => {
	return {
		pageName: newPageName,
	}
};
const asyncChangePageName = (newPageName: string) => {
	return new Promise(res => {
		setTimeout(() => {
			res({
				pageName: newPageName,
			})
		}, 3000);
	});
};

export default {
	changePageName,
	asyncChangePageName,
}
