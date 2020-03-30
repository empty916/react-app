/* eslint-disable */
import _cloneDeep from 'lodash/cloneDeep';

// const _env = process.env.NODE_ENV;

export const getUniqID = () => Math.random().toString(36).substr(2, 6);


export const fillDate = str => {
	const arr = str.split('');
	arr.splice(4, 0, '-');
	arr.splice(-2, 0, '-');
	return arr.join('');
};

export const fillZero = n => (n < 10 ? `0${n}` : `${n}`);

export const getToday = type => {
	const d = new Date();
	const y = d.getFullYear();
	const M = d.getMonth() + 1;
	const
		day = d.getDate();
	if (type) {
		return y + type + fillZero(M) + type + fillZero(day);
	}
	return y + fillZero(M) + fillZero(day);
};

export const getTheDay = (num, type) => {
	const d = new Date();
	const time = d.getTime();
	const D = new Date(time - (num) * (24 * 3600 * 1000));
	const y = D.getFullYear();
	const M = D.getMonth() + 1;
	const
		day = D.getDate();
	if (type) {
		return y + type + fillZero(M) + type + fillZero(day);
	}
	return y + fillZero(M) + fillZero(day);
};

export const getNow = type => {
	const d = new Date();
	const y = d.getFullYear();
	const M = d.getMonth() + 1;
	const day = d.getDate();
	const h = d.getHours();
	const m = d.getMinutes();
	const s = d.getSeconds();
	if (type) {
		return `${y + type + fillZero(M) + type + fillZero(day)}:${fillZero(h)}${type}${fillZero(m)}${type}${fillZero(s)}`;
	}
	return y + fillZero(M) + fillZero(day) + fillZero(h) + fillZero(m) + fillZero(s);
};

const encode = encodeURIComponent;

export const toQS = params => {
	const paramsList = [];
	for (const key in params) {
		paramsList.push(`${encode(key)}=${encode(params[key])}`);
	}
	return paramsList.join('&');
};

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

/**
 * obj对象转化成select元素的option结构，
 * {0: '无效'} => [{value: '0', text: '无效'}]
 * @param obj
 * @returns {Array}
 */
export const objToOptions = (obj, hasNull) => {
	const options = Object.keys(obj).map(key => ({
		value: key,
		text: obj[key],
	}));
	hasNull && options.unshift({
		value: '',
		text: '请选择',
	});
	return options;
};

/**
 * 根据data， 创建select元素的option选项
 * @param data
 * @param value
 * @param text
 * @param hasNull
 */
export const createOptions = ({data, value, text}, hasNull = false) => {
	const options = data.map(item => ({
		value: item[value],
		text: item[text],
	}));
	hasNull && options.unshift({
		value: '',
		text: '请选择',
	});
	return options;
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
