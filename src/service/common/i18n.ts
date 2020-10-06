import appService from '@/service/common/app';
import store from '@/store';
import { useState, useEffect } from 'react';

export const t = (key: keyof typeof appService.langData) => appService.langData[key];

const getStoreLang = () => store.getModule('app').state.lang;

export const useI18n = () => {
	const [lang, setLang] = useState(getStoreLang());
	useEffect(() => store.subscribe('app', () => {
		if (getStoreLang() !== lang) {
			setLang(getStoreLang());
		}
	}), [lang]);
	return t;
};
