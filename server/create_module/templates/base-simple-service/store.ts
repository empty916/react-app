const state = {
	name: 'template',
};

const maps = {
	nameSplit: ['name', (name: string) => name.split('')],
};

const actions = {
	update: (newState: any) => newState,
	asyncUpdate: async (newState: any) => {
		await new Promise(res => setTimeout(res, 3000));
		return newState;
	},
};


export {
	state,
	maps,
	actions,
};
