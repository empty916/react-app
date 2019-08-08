const changePageName = (newPageName: string) => ({
	pageName: newPageName,
});
const asyncChangePageName = async (newPageName: string) => {
	await new Promise(res => setTimeout(res, 3000));
	return {
		pageName: newPageName,
	};
};

export default {
	changePageName,
	asyncChangePageName,
};
