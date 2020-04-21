import { AuthType } from '@/constants/Auth';
import NaturService from 'natur-service';

class UserService extends NaturService {
	constructor() {
		super();
		this.getModule('user', ({oldModule, newModule}) => {
			console.log(oldModule, newModule);
		});
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
