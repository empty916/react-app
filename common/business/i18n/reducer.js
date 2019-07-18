import * as types from './constants';

const ls = window.localStorage;
const vailableLangs = {
	zh: 'zh-CN',
	en: 'en-US',
};

const defaultLang = vailableLangs.zh;
const localLang = ls.getItem('lang');
const localLangIsValid = !!localLang;
const initLang = localLangIsValid ? localLang : defaultLang;

const initialState = {
	vailableLangs,
	lang: initLang,
};

const i18n = (state = initialState, { type, data }) => {
	switch (type) {
		case types.UPDATE_LANG:
			if (typeof data !== 'string') {
				return state;
			}
			ls.setItem('lang', data);
			return {
				...state,
				lang: data,
			};
		default:
			return state;
	}
};

export default i18n;
