import { AuthType } from '@/constants/Auth';
// import store from '@/store';
import NaturService from 'natur-service';

// NaturService.store = store;
class UserService extends NaturService {
	constructor() {
		super();
		this.getModule('user');
		this.watch('user', ({state}) => {
			this.dispatch('page2/changePageName', state.name)
				.then((arg: any) => {
					console.log('then', arg);
				})
				.catch(err => {
					console.log(err);
				});
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
