
// const changePageName = (newPageName: string) => ({setState}: any) => setState({
// 	pageName: newPageName,
// });
const changePageName = (newPageName: string) => {
	console.log('change page name');
	return {
		pageName: newPageName,
	};
};
const asyncChangePageName = async (newPageName: string) => {
	await new Promise(res => setTimeout(res, 3000));
	return {
		pageName: newPageName,
	};
};

const inc = () => ({getState, setState}: any) => {
	setState({count: getState().count + 1});
};

export default {
	changePageName,
	asyncChangePageName,
	inc,
};
