import store from '@/store';

export const getLangData = () => store.getModule('app').maps.getLangData;
