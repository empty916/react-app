import store from '@/store';
import zh from '@/constants/lang/zh';

export const getLangData = (): typeof zh => store.getModule('app').maps.getLangData;
