const state = {
	name: 'userList',
	age: 11,
};

const maps = {
	nameSplit: ['name', (s: any) => s, (name: string) => name.split('')],
	add1: [(s: any) => s.name, (name: string) => {
		console.log('run add1');
		return `${name}1`;
	}],
	addAny: [(s: any) => s.name, (name: string) => (a1: string) => `${name}${a1}`],
};

const actions = {
	returnUndef: () => undefined,
	thunkReturnUndef: () => () => undefined,
	asyncThunkReturnUndef: () => () => Promise.resolve(undefined),
	asyncReturnUndef: () => Promise.resolve(undefined),

	update: (params: any) => ({getState}: any) => ({
		...getState(),
		...params,
	}),
	asyncUpdate: () => async ({getState, setState}: any) => {
		// await new Promise(res => setTimeout(res, 3000));
		console.log('async update run!');
		setInterval(() => {
			setState({
				...getState(),
				age: parseInt(getState().age, 10) + 1,
			});
		}, 1000);
		return {
			...getState(),
			age: parseInt(getState().age, 10) + 10,
		};
	},
};


export {
	state,
	maps,
	actions,
};
