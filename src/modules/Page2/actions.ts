
const changePageName = (newPageName: string) => ({
	pageName: newPageName,
});
const asyncChangePageName = async (newPageName: string, state: any) => {
	await new Promise(res => setTimeout(res, 3000));
	return {
		...state,
		pageName: newPageName,
	};
};

const inc = (state: any) => ({...state, count: state.count + 1});

export default {
	changePageName,
	asyncChangePageName,
	inc,
};
