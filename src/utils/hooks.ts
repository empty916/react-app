import { useEffect, useRef, useState } from 'react';


/* eslint-disable */

export const useInit = (fn: Function) => {
	useState(fn);
};
export const useMounted = (fn: Function) => {
	useEffect(() => { fn(); }, []);
};
export const useUnMount = (fn: () => any) => {
	useEffect(() => fn, []);
};
export const useUpdated = (fn: Function) => {
	const isMounted = useRef(false);
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

export const useInterval = (fn: () => any, delay:number) => {
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
