import store from '@/store';
import { type } from '@/constants/Auth';

export const isLogin = () => store.getModule('user').maps.isLogin;

export const hasAuth = (auth: string | undefined, authType?: type) => store.getModule('user').maps.hasAuth(auth, authType);
