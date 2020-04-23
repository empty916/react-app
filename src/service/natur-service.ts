import _NaturService from 'natur-service';

export default class NaturService extends _NaturService {
	protected dispatch(type: string, ...arg: any[]) {
		return super.dispatch(type, ...arg).catch((err) => {
            if (err?.code === 0) {
                return;
            }
            throw err;
        });
	}
}
