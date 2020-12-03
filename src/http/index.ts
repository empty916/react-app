import axios, { AxiosRequestConfig } from 'axios';
import { dateFormatting } from '@/utils';
import SHA256 from 'crypto-js/sha256';
import channel from './config';
import history from '../routes/history';

const { server: serverUrl } = channel;


// 字典排序
const azSort = (data: {[p: string]: any}) => {
	const obj: {[p: string]: any} = {};
	Object.keys(data)
		.sort()
		.forEach(i => {
			obj[i] = data[i];
		});
	let tmpStr = '';
	/* eslint-disable */
	for (const i in obj) {
		tmpStr += `${i}=${obj[i]}&`;
	}
	/* eslint-enable */
	tmpStr = tmpStr.substr(0, tmpStr.length - 1);
	// console.log('----->.....', tmpStr);
	return tmpStr;
};

const createRequestId = () => Math.random().toString(36).substr(2, 12) + Date.now();

// 生成唯一串
let requestId: string;
const refreshId = () => requestId = createRequestId();

history.listen(refreshId);

// 拼接参数
// requestNo规则: 请求参数+url+authCode+ Uid + time => SHA256 保证唯一且同一请求不变
const appendParams = (data = {}, url: string) => ({
	chnId: '10003',
	requestType: 'PC',
	requestNo: SHA256(`${JSON.stringify(data)}${url}${window.localStorage.authCode ? window.localStorage.authCode : ''}${requestId}`).toString().substring(0, 32),
	requestTime: dateFormatting('yyyy-MM-dd hh:mm:ss', new Date().toString()),
	authCode: window.localStorage.authCode ? window.localStorage.authCode : '',
});

// 默认配置
const config = {
	baseURL: serverUrl,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	timeout: 1000 * 20,
	withCredentials: true,
};
// 创建实例对象
const instance = axios.create(config);

const createRequestRecords = (requestNo: string) => ({
	requestNo,
	timestamp: Date.now(),
});

type TRequestCache = {
	[p: string]: {
		requestNo: string;
		timestamp: number;
	}
};
const timeLimit = 666;// 前端接口请求防重复点击阀值
const requestCache: TRequestCache = {};
interface IAxiosRequestConfig extends AxiosRequestConfig {
	loading?: boolean;
}
// 请求拦截器
instance.interceptors.request.use((requestConfig: IAxiosRequestConfig) => {
	// 请求之前，搞些事情
	const { loading = true, data, url: _url } = requestConfig;
	const url = _url || '';
	let params = appendParams(data, url);
	// 前端防重判断
	if (requestCache[url] && requestCache[url].requestNo === params.requestNo) {
		const { timestamp } = requestCache[url];
		// const { timeLimit } = requestCache;
		const now = Date.now();
		if (now - timestamp < timeLimit) {
			requestCache[url].timestamp = now;
			throw new Error('请勿重复操作！');
		} else {
			refreshId();
			params = appendParams(data, url);
		}
	}
	requestCache[url] = createRequestRecords(params.requestNo);
	const beforeSort = { ...data, ...params }; // 拼接参数
	const afterSort = azSort(beforeSort); // 参数排序

	const signData = SHA256(afterSort); // 参数加密
	requestConfig.data = { ...beforeSort, sign: signData };

	return requestConfig;
},
error => Promise.reject(error));

// 响应拦截器
instance.interceptors.response.use(
	response => {
		// nativeLog(response);
		// 服务端响应成功时，搞些事情
		// console.log(`请求成功----->${JSON.stringify(response)}`);
		const { responseCode } = response.data;
		// console.log('-----.', responseCode);
		if (responseCode === '3001') {
			// message.error('登录超时，请重新登录', 1);
			history.replace('/login');
		}
		if (responseCode !== '200') {
			throw response; // eslint-disable-line
		}
		// console.log('-----.', responseCode);
		return response;
	},
	error => {
		// 服务端响应失败时，搞些事情
		if (error.message) {
			// message.error(error.message, 2);
		} else {
			// message.error('请求失败,请重试', 2);
			refreshId();
		}
		return Promise.reject(error);
	},
);

export default instance;
