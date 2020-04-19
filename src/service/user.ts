import store from '@/store';
import { AuthType } from '@/constants/Auth';
import NaturService from 'natur-service';

export const isLogin = () => store.getModule('user').maps.isLogin;

export const hasAuth = (auth: string | undefined, authType?: AuthType) => store.getModule('user').maps.hasAuth(auth, authType);


class UserService extends NaturService {
	constructor() {
		super();
		this.getModule('user');
	}

	get isLogin() {
		return this.user.maps.isLogin;
	}

	hasAuth(auth: string | undefined, authType?: AuthType) {
		return this.user.maps.hasAuth(auth, authType);
	}
}

const userService = new UserService();

export default userService;
