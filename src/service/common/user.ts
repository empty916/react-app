import { AuthType } from '@/constants/Auth';
import NaturService from '../natur-service';

class UserService extends NaturService {
	constructor() {
		super();
		this.watch('user', ({actionName, state}) => {
			if (actionName === 'updateName' && state) {
				this.dispatch('page2', 'changePageName', state?.name);
			}
		});
	}

	get isLogin() {
		return this.store.getModule('user').maps.isLogin;
	}

	hasAuth(auth: string | undefined, authType?: AuthType) {
		return this.store.getModule('user').maps.hasAuth(auth, authType);
	}
}

const userService = new UserService();

export default userService;
