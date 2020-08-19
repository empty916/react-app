
import { MiddlewareParams } from 'natur';
import { ThunkParams } from 'natur/dist/middlewares';


export const state = {
	pageName: 'page2',
	count: 1,
};
export const maps = {
	pageNameSplit: ['pageName', (pageName: string) => pageName.split('')],
	countIsOdd: ['count', (count: number) => count % 2 !== 0],
	countObj: ['count', (count: number) => ({count})],
};
export const actions = {
	changePageName: (newPageName: string) => ({
		pageName: newPageName,
	}),
	asyncChangePageName: async (newPageName: string) => {
		await new Promise(res => setTimeout(res, 3000));
		return {
			pageName: newPageName,
		};
	},
	inc: () => ({getState}: ThunkParams<State>) => ({count: getState().count + 1}),
};


type State = typeof state;

export type InjectPage2ModuleType = {
    state: State,
    maps: {
        pageNameSplit: string[],
        countIsOdd: boolean,
        countObj: {count: number},
    },
    actions: {
        changePageName(n: string): State,
        asyncChangePageName(n: string): Promise<State>,
        inc(): State,
    }
}
