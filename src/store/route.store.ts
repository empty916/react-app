import {Location, createHashHistory} from 'history';


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

const currentHistory = createHashHistory();
(window as any).currentHistory = currentHistory;

export default currentHistory;
