import createPersistMiddleware from 'natur-persist';


const { middleware: localStorageMiddleware, getData, clearData } = createPersistMiddleware({
	name: '_data',
	time: 300,
	include: ['user', 'app'],
	// exclude: [/router/i],
	specific: {
		user: 0,
	},
});

export {
	localStorageMiddleware,
	getData,
	clearData,
};
