export const state = {
	pageName: 'page2',
	count: 1,
};

export const maps = {
	pageNameSplit: (_state: any) => _state.pageName.split(''),
	countIsOdd: (_state: typeof state) => _state.count % 2 !== 0,
	countObj: (_state: typeof state) => ({count: _state.count}),
};
