import store from '@/store';

export const isLogin = () => store.getModule('user').maps.isLogin;
