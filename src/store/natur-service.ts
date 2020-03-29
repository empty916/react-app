import { Store } from 'natur';
import store from './index';

function StoreModule(moduleName: string): any {
	console.log(moduleName);
	return function (target: any, name: string, descriptor: any) {
		const v = store.getModule(moduleName);
		// 返回一个新的描述对象，或者直接修改 descriptor 也可以
		return {
			enumerable: true,
			configurable: true,
			get() {
				return v;
			},
		};
	};
}

class NaturService {
	static store: Store | undefined;

	@StoreModule('app')
	app = null;

	demo: number = 1;

	constructor() {
		this.demo = 2;
		console.log(this.app);
	}
}

NaturService.store = store;

// const a = new NaturService();

export default NaturService;
