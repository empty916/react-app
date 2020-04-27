export const state = {
	name: 'page3',
};

export const maps = {
	nameSplit: ['name', (name: string) => name.split('')],
};

export const actions = {
	update: (newState: any) => newState,
	asyncUpdate: async (newState: any) => {
		await new Promise(res => setTimeout(res, 3000));
		return newState;
	},
};

type State = typeof state;

export type InjectPage3ModuleType = {
	state: State,
	maps: {
		nameSplit: string[],
	},
	actions: {
		update(s: State): State,
		asyncUpdate(s: State): Promise<State>,
	}
}
