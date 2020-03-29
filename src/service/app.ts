import store from '@/store';
import zh from '@/constants/lang/zh';
import en from '@/constants/lang/en';

export const getLangData = (): typeof zh | typeof en => store.getModule('app').maps.getLangData;
