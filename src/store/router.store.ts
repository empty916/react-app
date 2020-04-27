import { Location } from 'history';

type State = {
	location: null | Location,
}

export type InjectRouterModuleType = {
	state: State,
	maps: {},
	actions: {
		updateLocation(location: Location): State,
	}
}

export default {
	state: {
		location: null,
	},
	maps: {},
	actions: {
		updateLocation: (location: Location) => ({location}),
	},
};
