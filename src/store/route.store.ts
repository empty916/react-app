import {Location, createHashHistory} from 'history';


export const location = {
	state: null,
	actions: {
		update: (newLocation: Location) => newLocation,
	},
};

const currentHistory = createHashHistory();
// (window as any).currentHistory = currentHistory;

export default currentHistory;
