export const state = {
	pageName: 'page2',
	count: 1,
};

export const maps = {
	pageNameSplit: ['pageName', (pageName: string) => pageName.split('')],
	countIsOdd: ['count', (count: number) => count % 2 !== 0],
	countObj: ['count', (count: number) => ({count})],
	// countObj1: (count: number) => ({count}),
};
