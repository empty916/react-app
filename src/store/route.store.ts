import {History, Location} from 'history';

type TState = {
	history: History | null;
	location: Location | null;
}

export const state: TState = {
	history: null,
	location: null,
};

export const actions = {
	changeRoute: (route: TState) => {
		console.log(route);
		return route;
	},
};
