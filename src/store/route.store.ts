import {History, Location} from 'history';

let currentHistory: History | null = null;

export const history = {
	state: {
		value: null,
	},
	maps: {
		getHistory: () => () => currentHistory,
	},
	actions: {
		update: (newHistory: History) => {
			currentHistory = newHistory;
			return {
				value: newHistory,
			};
		},
	},
};

export const location = {
	state: {
		value: null,
	},
	actions: {
		update: (newLocation: Location) => ({
			value: newLocation,
		}),
	},
};
