
const changePageName = (newPageName: string) => ({setState}: any) => {
	setState({
		pageName: `${newPageName}1`,
	});
	return setState({
		pageName: newPageName,
	});
};
const asyncChangePageName = async (newPageName: string, state: any) => {
	await new Promise(res => setTimeout(res, 3000));
	return {
		...state,
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
