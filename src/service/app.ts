import NaturService from './natur-service';
import { StoreType } from '@/store';


class AppService extends NaturService {
	app!: StoreType['app'];

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
