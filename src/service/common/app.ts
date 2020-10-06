import NaturService from '../natur-service';


class AppService extends NaturService {
	get langData() {
		return this.store.getModule('app').maps.getLangData;
	}

	showLoading() {
		this.store.dispatch('loading', 'show');
	}

	hideLoading() {
		this.store.dispatch('loading', 'hide');
	}
}

const appService = new AppService();

export default appService;
