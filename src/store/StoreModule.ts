import store from '@client/store/index';
import { InjectStoreModule } from 'rns-pure';

export default class StoreModule {
	storeModule!: InjectStoreModule;

	constructor(moduleName: string) {
		if (!store.hasModule(moduleName)) {
			console.warn(`${moduleName}不存在！`);
		}
		this.getModule(moduleName);
		this.listenUpdate(moduleName);
	}

	getModule(moduleName:string) {
		this.storeModule = store.getModule(moduleName);
	}

	listenUpdate(moduleName: string) {
		store.subscribe(moduleName, () => this.getModule(moduleName));
	}
}
