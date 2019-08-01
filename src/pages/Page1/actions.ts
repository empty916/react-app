const changePageName = (state: any, newPageName: string) => ({
	...state,
	pageName: newPageName,
});

export default {
	changePageName,
}
