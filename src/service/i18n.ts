import { useInject } from 'natur';
import { getLangData } from '@/service/app';


export const t = (key: string) => getLangData()[key];


export const useI18n = () => {
	useInject('app'); // 监听app中的语言配置
	return t;
};
