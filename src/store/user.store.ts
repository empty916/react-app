export default {
	state: {
		name: 'tom',
	},
	actions: {
		updateName: (state: any, newName: string) => ({...state, name: newName}),
	},
};
