import {Middleware} from 'rns-pure';

export class AutoFill {
	value = {};

	type = 'object';

	constructor(value: any, type = 'object') {
		this.value = value;
		this.type = type;
	}

	static of(value: any, type: string) {
		return new AutoFill(value, type);
	}
}


export const autoFillMid: Middleware = ({getState}) => next => record => {
	let newRecord = record;
	if (record.state instanceof AutoFill) {
		switch (record.state.type) {
			case 'object':
				newRecord = {
					...newRecord,
					state: {
						...getState(),
						...newRecord.state.value,
					},
				};
				break;
			case 'array':
				newRecord = {
					...newRecord,
					state: [
						...getState(),
						...newRecord.state.value,
					],
				};
				break;
		}
	}
	return next(newRecord);
};
