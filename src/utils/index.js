/* eslint-disable */
import _cloneDeep from 'lodash/cloneDeep';

// const _env = process.env.NODE_ENV;

export const getUniqID = () => Math.random().toString(36).substr(2, 6);

export const formatMoney = (money, n) => {
	if (!money || !(money = parseFloat(money))) {
		money = 0;
	}
	n = n > 0 && n <= 3 ? n : 2;
	money = money.toFixed(n);
	const l = money.split('.')[0].split('').reverse();
	const r = money.split('.')[1];
	let t = '';
	for (let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
	}
	return `${t.split('').reverse().join('')}.${r}`;
};

export const unformatMoney = num => {
	if (!!num) {
		return num.replace(/,/g, '');
	}
	return num;
};

export const dateFormatting = (fmt, dateStr) => {
	if (!dateStr) return '';
	dateStr = dateStr.replace(new RegExp('-', 'g'), '\/');
	const date = new Date(dateStr);
	const o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
	}
	for (const k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
		}
	}
	return fmt;
};


export const cloneDeep = _cloneDeep || (obj => JSON.parse(JSON.stringify(obj)));

export const pipePromise = promiseArr => () => new Promise((resolve, reject) => {
	const promiseChain = promiseArr.reduce(
		(lastPromise, promise) => () => lastPromise().then(promise).catch(err => {
			reject(err);
			return Promise.reject(err);
		}),
		() => Promise.resolve(),
	);
	promiseChain().then(resolve);
});

export const composePromise = promiseArr => () => new Promise((resolve, reject) => {
	const promiseChain = promiseArr.reduceRight(
		(lastPromise, promise) => () => lastPromise().then(promise).catch(err => {
			reject(err);
			return Promise.reject(err);
		}),
		() => Promise.resolve(),
	);
	promiseChain().then(resolve);
});

if (Object.defineProperty) {
	Object.defineProperty(Promise, 'pipe', {
		value: pipePromise,
		enumerable: false,
		configurable: false,
		writable: false,
	});
	Object.defineProperty(Promise, 'compose', {
		value: composePromise,
		enumerable: false,
		configurable: false,
		writable: false,
	});
} else {
	Promise.pipe = pipePromise;
	Promise.compose = composePromise;
}
