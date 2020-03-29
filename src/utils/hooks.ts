import { useEffect, useRef, useState } from 'react';
import { getLangData } from '@/service/app';
import { useInject } from 'natur';

/* eslint-disable */
interface IFn {
	(): any;
}
export const useInit = (fn: Function) => {
	useState(fn);
};
export const useMounted = (fn: IFn) => {
	useEffect(() => { fn(); }, []);
};
export const useUnMount = (fn: IFn) => {
	useEffect(() => fn, []);
};
export const useUpdated = (fn: IFn) => {
	const isMounted = useRef(false);
	// const cb = useRef(null);
	// useEffect(() => {
	// 	cb.current = () => fn();
	// }, [fn]);
	useEffect(() => {
		if (isMounted.current) {
			fn();
		}
	}, [fn]);
	useEffect(() => {
		if (isMounted.current === false) {
			isMounted.current = true;
		}
		return () => { isMounted.current = false; };
	}, []);
};

export const useInterval = (fn: IFn, delay:number) => {
	const cb = useRef(() => {});
	useEffect(() => {
		cb.current = fn;
	}, [fn]);
	useEffect(() => {
		const runCb = () => cb.current();
		const id = setInterval(runCb, delay);
		return () => clearInterval(id);
	}, [delay]);
};


export const useI18n = () => {
	useInject('app'); // 监听app中的语言配置
	console.log(getLangData())
	return (key: string) => getLangData()[key];
}