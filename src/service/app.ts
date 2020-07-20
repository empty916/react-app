import NaturService from './natur-service';
import { StoreModulesType } from '@/store';


class AppService extends NaturService {
	app!: StoreModulesType['app'];

	constructor() {
		super();
		this.bindModule('app');
	}

	get langData() {
		return this.app.maps.getLangData;
	}
}

const appService = new AppService();

export default appService;
