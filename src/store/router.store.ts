import { Location } from 'history';

export default {
	state: {
		location: null,
	},
	maps: {},
	actions: {
		updateLocation: (location: Location) => ({location}),
	},
};
