import {History, Location} from 'history';

type TState = {
	history: History | null;
	location: Location | null;
}

let currentHistory: History | null = null;
export const state: TState = {
	history: null,
	location: null,
};

export const maps = {
	getHistory: () => () => currentHistory,
};

export const actions = {
	changeRoute: (route: TState) => {
		currentHistory = route.history;
		return route;
	},
};
