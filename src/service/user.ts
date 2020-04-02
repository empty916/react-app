import store from '@/store';
import { AuthType } from '@/constants/Auth';

export const isLogin = () => store.getModule('user').maps.isLogin;

export const hasAuth = (auth: string | undefined, authType?: AuthType) => store.getModule('user').maps.hasAuth(auth, authType);
