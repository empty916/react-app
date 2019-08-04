const changePageName = (state: any, newPageName: string) => {
	return {
		...state,
		pageName: newPageName,
	}
};
const asyncChangePageName = (state: any, newPageName: string) => {
	return new Promise(res => {
		setTimeout(() => {
			res({
				...state,
				pageName: newPageName,
			})
		}, 3000);
	});
};

export default {
	changePageName,
	asyncChangePageName,
}
