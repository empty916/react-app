import { getLangData } from '@/service/app';
import store from '@/store';
import zh from '@/constants/lang/zh';
import en from '@/constants/lang/en';
import { useState, useEffect } from 'react';

type ZH = typeof zh;
type EN = typeof en;

export const t = (key: keyof ZH | keyof EN) => getLangData()[key];


const getStoreLang = ():'zh'|'en' => store.getModule('app').state.lang;
export const useI18n = () => {
	const [lang, setLang] = useState(getStoreLang());
	useEffect(() => store.subscribe('app', () => {
		if (getStoreLang() !== lang) {
			setLang(getStoreLang());
		}
	}), []); // eslint-disable-line
	return t;
};
