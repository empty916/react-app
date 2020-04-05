import AUTH, {AuthType} from '@/constants/Auth';

const ls = window.localStorage;

export default {
	state: {
		name: ls.name || '',
		level: 1,
		role: 'admin',
	},
	maps: {
		isLogin: ['name', (name:string) => !!name],
		hasAuth: ['name', 'level', 'role', (name:string, level: number, role: string) => (auth: string | undefined, type: AuthType = 'auth') => {
			if (auth === undefined) {
				return true;
			}
			switch (type) {
				case 'auth':
					if (auth === AUTH.LOGIN_AUTH) {
						return !!name;
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
		updateName: (event: any) => {
			const name = event?.target?.value || '';
			ls.name = name;
			return {name};
		},
	},
};
