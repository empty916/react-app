const changePageName = (newPageName: string, state: any) => {
	return {
		...state,
		pageName: newPageName,
	}
};
const asyncChangePageName = (newPageName: string, state: any, ) => {
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
