import store from '@/store';
import { AuthType } from '@/constants/Auth';
import NaturService from 'natur-service';

export const isLogin = () => store.getModule('user').maps.isLogin;

export const hasAuth = (auth: string | undefined, authType?: AuthType) => store.getModule('user').maps.hasAuth(auth, authType);


class UserService extends NaturService {
	constructor() {
		super();
		this.getModule('user', (...arg: any[]) => {
			console.log(arg);
		});
	}

	fetchUserInfo() {
		return this.user.actions.fetchData();
	}

	getName() {
		return this.user.state.name;
	}

	removeName() {
		return this.user.actions.removeName();
	}
}


export default new UserService();
