import AUTH, {AuthType} from '@/constants/Auth';


const getStateNameIsExist = (state: any) => !!state.name;

const store = {
	state: {
		name: '',
		level: 1,
		role: 'admin',
	},
	maps: {
		isLogin: [getStateNameIsExist, (isExist: boolean) => isExist],
		hasAuth: [getStateNameIsExist, 'level', 'role', (isExist:boolean, level: number, role: string) => (auth: string | undefined, type: AuthType = 'auth') => {
			if (auth === undefined) {
				return true;
			}
			switch (type) {
				case 'auth':
					if (auth === AUTH.LOGIN_AUTH) {
						return !!isExist;
					}
					return !auth;
				case 'level':
					return parseInt(auth, 10) >= level;
				case 'role':
					return role === 'admin' || role === auth;
				default:
					return true;
			}
		}],
	},
	actions: {
		updateName: (event: any) => ({name: event?.target?.value || ''}),
	},
};


type State = typeof store.state;

export type InjectUserModuleType = {
	state: State,
	maps: {
		isLogin: boolean,
		hasAuth(auth: string | undefined, type: AuthType): boolean,
	},
	actions: {
		updateName(event: {target: {value: string}}): State,
	}
}

export default store;
