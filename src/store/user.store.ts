export default {
	state: {
		name: 'tom',
	},
	maps: {
		isLogin: ['name', (name:string) => !!name],
	},
	actions: {
		updateName: (state: any, newName: string) => ({...state, name: newName}),
	},
};
