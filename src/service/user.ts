import { AuthType } from '@/constants/Auth';
import NaturService from 'natur-service';

class UserService extends NaturService {
	constructor() {
		super();
		// this.getModule('user');
		this.getModule('user');
		this.getModule('page2');
		this.watch('user', ({state}) => {
			const res = this.dispatch('page2/changePageName', state.name);
			// const res = this.page2?.actions?.changePageName(state.name);
			res.then(console.log);
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
