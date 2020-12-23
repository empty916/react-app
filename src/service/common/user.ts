import { AuthType } from '@/constants/common/Auth';
import NaturService from '../natur-service';

class UserService extends NaturService {
	start() {
		this.watch('user', ({actionName, state}) => {
			if (actionName === 'updateName' && state) {
				this.dispatch('page2', 'changePageName', state?.name);
			}
		});
		this.watch('page1', ({actionName, state}) => {
			if (actionName === 'asyncChangePageName2' && state) {
				this.dispatch('page2', 'asyncChangePageName', state?.pageName);
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
