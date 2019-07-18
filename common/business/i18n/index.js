import React, {Component} from 'react';
import intl from 'react-intl-universal';
import {PropTypes} from 'prop-types';
import {LocaleProvider} from 'antd';
import inject from '@inject';
import _zhCN from '@client/common/langs/zh-CN';
import _enUS from '@client/common/langs/en-US';

import antdZhCN from 'antd/lib/locale-provider/zh_CN';
import antdEnCN from 'antd/lib/locale-provider/en_US';

// 本项目的语言数据
const projectLocales = {
	'zh-CN': _zhCN,
	'en-US': _enUS,
};

// antd 组件库的语言数据
const antdLocals = {
	'zh-CN': antdZhCN,
	'en-US': antdEnCN,
};


@inject('i18n')
class I18n extends Component {
	static childContextTypes = {
		lang: PropTypes.string,
		vailableLangs: PropTypes.object,
		updateLang: PropTypes.func,
	};
	constructor(props) {
		super(props);
		this._init();
	}
	getChildContext() {
		const {lang, vailableLangs} = this.props.i18nStore;
		const {updateLang} = this.props.i18nActions;
		return {
			lang,
			vailableLangs,
			updateLang,
		};
	}

	_init = () => {
		const {lang} = this.props.i18nStore;
		intl.init({
			currentLocale: lang,
			locales: projectLocales,
		});
	};

	render() {
		const {children} = this.props;
		const {lang} = this.props.i18nStore;
		return (
			<LocaleProvider locale={antdLocals[lang]}>
				{children}
			</LocaleProvider>
		);
	}
}

export default I18n;
