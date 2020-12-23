
export const state = {
	pageName: 'page1',
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
	asyncChangePageName1: async (newPageName: string) => {
		await new Promise(res => setTimeout(res, 3000));
		return {
			pageName: newPageName,
		};
	},
	asyncChangePageName2: async (newPageName: string) => {
		await new Promise(res => setTimeout(res, 3000));
		return {
			pageName: newPageName,
		};
	},
};
