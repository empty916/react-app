import NaturService from './natur-service';
import zh from '@/constants/lang/zh';
import en from '@/constants/lang/en';


class AppService extends NaturService {
	constructor() {
		super();
		this.bindModule('app', '$app');
		this.watch('app', () => console.log(this));
	}

	get langData(): typeof zh | typeof en {
		return this.app.maps.isLogin;
	}
}

const appService = new AppService();

export default appService;
