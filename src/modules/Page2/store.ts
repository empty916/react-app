import { ThunkParams } from 'natur/dist/middlewares';

export const state = {
	pageName: 'page2',
	count: 1,
	// rowsSelected: ['1', '2'],
	rowsSelected: [0, 2],
};
export const maps = {
	pageNameSplit: ['pageName', (pageName: string) => pageName.split('')],
	countIsOdd: ['count', (count: number) => count % 2 !== 0],
	countObj: ['count', (count: number) => ({count})],
	test: ['count', () => () => true],
};
export const actions = {
	updateRowsSelected: (rowsSelected: State['rowsSelected']) => ({rowsSelected}),
	changePageName: (newPageName: string) => {
		console.log('changePageName: ', newPageName);
		return {
			pageName: newPageName,
		};
	},
	asyncChangePageName: async (newPageName: string) => {
		await new Promise(res => setTimeout(res, 10000));
		return {
			pageName: newPageName,
		};
	},
	inc: () => ({getState}: ThunkParams<State>) => ({count: getState().count + 1}),
};

type State = typeof state;
