import { useInject } from 'natur';
import { getLangData } from '@/service/app';
import zh from '@/constants/lang/zh';
import en from '@/constants/lang/en';

type ZH = typeof zh;
type EN = typeof en;

export const t = (key: keyof ZH | keyof EN) => getLangData()[key];


export const useI18n = () => {
	useInject('app'); // 监听app中的语言配置
	return t;
};
