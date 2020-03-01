import {InjectMaps} from 'natur';

const changePageName = (newPageName: string) => (getState: () => any, setState: (s: any) => any, getMaps: () => InjectMaps) => {
	console.log(getMaps());
	setState({
		...getState(),
		pageName: newPageName,
	});
	// return {
	// 	...getState(),
	// 	pageName: newPageName,
	// };
};
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
