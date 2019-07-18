import _zhCN from '@client/common/langs/zh-CN';
import _enUS from '@client/common/langs/en-US';
import intl from 'react-intl-universal';
import * as type from './constants';

// 本项目的语言数据
const projectLocales = {
	'zh-CN': _zhCN,
	'en-US': _enUS,
};

const updateLang = lang => {
	intl.init({
		currentLocale: lang,
		locales: projectLocales,
	});
	return {
		type: type.UPDATE_LANG,
		data: lang,
	};
};

export { updateLang };
