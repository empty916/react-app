import { useInject } from 'natur';
import { getLangData } from '@/service/app';
import zh from '@/constants/lang/zh';

type ZH = typeof zh;

export const t = (key: keyof ZH) => getLangData()[key];


export const useI18n = () => {
	useInject('app'); // 监听app中的语言配置
	return t;
};
