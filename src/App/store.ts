import theme from '@/service/theme';
import zhLang from '@/constants/lang/zh';
import enLang from '@/constants/lang/en';

const ls = window.localStorage;

const state = {
	name: 'app',
	lang: ls.lang || 'zh',
};

const update = (appName: string) => {
	theme.set('cardBgColor', 'red');
	return {name: appName};
};

const setLang = (lang: 'zh' | 'en') => {
	ls.lang = lang;
	return {lang};
};

const maps = {
	getLangData: ['lang', (lang: 'zh' | 'en') => {
		if (lang === 'zh') {
			return zhLang;
		}
		return enLang;
	}],
};

export default {
	state,
	maps,
	actions: {
		update,
		setLang,
	},
};
