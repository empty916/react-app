import NaturService from './natur-service';


class AppService extends NaturService {
	get langData() {
		return this.store.getModule('app').maps.getLangData;
	}
}

const appService = new AppService();

export default appService;
