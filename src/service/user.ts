import { AuthType } from '@/constants/Auth';
import NaturService from './natur-service';
import { StoreType } from '@/store';

class UserService extends NaturService {
	user!: StoreType['user'];

	constructor() {
		super();
		this.bindModule('user');
		this.watch('user', ({actionName, state}) => {
			if (actionName === 'updateName' && state) {
				this.dispatch('page2', 'changePageName', state?.name);
			}
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
