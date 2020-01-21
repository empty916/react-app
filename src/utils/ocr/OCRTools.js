/**
 * Created by SamMFFL on 2017/11/6.
 */
/* eslint-disable */
// import 'whatwg-fetch';
import {CryptoJS} from '@noAnyDoor/jsrsasignc.js';

Date.prototype.Format = function (fmt) {
	const o = {
		'M+': this.getMonth() + 1, // 月份
		'd+': this.getDate(), // 日
		'h+': this.getHours(), // 小时
		'm+': this.getMinutes(), // 分
		's+': this.getSeconds(), // 秒
		'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
		'S': this.getMilliseconds(), // 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
	for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
	return fmt;
};


function doSign(params, secretKey) {
	// 第一步：参数排序(按ASCII顺序排序)
	const keys = Object.keys(params).sort();
	// console.log('Source1 --->>> ', keys)
	// 第二步：把所有参数名和参数值串在一起(前后加上secretKey)
	let source = secretKey;
	keys.forEach(key => {
		if (key !== 'sign' && key !== '') {
			source += key;
			source += params[key];
		}
	});
	source += secretKey;
	// console.log('Source2 --->>> ', source)

	// 16位随机数盐生成
	const salt = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
	const md5 = CryptoJS.MD5(source + salt).toString();
	const cs = new Array(48);
	for (let i = 0; i < 48; i += 3) {
		cs[i] = md5.charAt(i / 3 * 2);
		const c = salt.charAt(i / 3);
		cs[i + 1] = c;
		cs[i + 2] = md5.charAt(i / 3 * 2 + 1);
	}
	return cs.join('').toUpperCase();
}


/**
 * OCR接口加签，返回数组包含
 * @param params
 * { bizId, ip, url, secretKey }
 * bizId 渠道区分
 * ip h5获取不到随意填入
 * url 对应使用的接口路径
 * secretKey 秘钥
 * @returns {*}
 */
export const getOCRSign = params => {
	const {bizId, ip, url, secretKey, timestamp} = params;
	return doSign({bizId, ip, url, timestamp}, secretKey);
};

/**
 * 图片元素进行压缩，返回base64
 * @param img
 * @returns {string}
 */
export const compress = img => {
	let {width} = img;
	let {height} = img;
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const tCanvas = document.createElement('canvas');
	const tctx = tCanvas.getContext('2d');

	// 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
	let ratio;
	if ((ratio = width * height / 5000000) > 1) {
		ratio = Math.sqrt(ratio);
		width /= ratio;
		height /= ratio;
	} else {
		ratio = 1;
	}
	canvas.width = width;
	canvas.height = height;

	// 铺底色
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 如果图片像素大于100万则使用瓦片绘制
	let count;
	if ((count = width * height / 1000000) > 1) {
		count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片

		// 计算每块瓦片的宽和高
		const nw = ~~(width / count);
		const nh = ~~(height / count);
		tCanvas.width = nw;
		tCanvas.height = nh;

		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

				ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
			}
		}
	} else {
		ctx.drawImage(img, 0, 0, width, height);
	}
	// 进行最小压缩
	const ndata = canvas.toDataURL('image/jpeg', 0.8);
	tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
	return ndata;
};

/**
 * 把base64字符串转换成blob二进制流
 * @param baseStr
 * @param type
 * @returns {*}
 */
export const getBlob = (baseStr, type) => {
	let blob;
	try {
		const text = window.atob(baseStr.split(',')[1]);
		const buffer = new ArrayBuffer(text.length);
		const ubuffer = new Uint8Array(buffer);


		for (let i = 0; i < text.length; i++) {
			ubuffer[i] = text.charCodeAt(i);
		}

		const Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;


		if (Builder) {
			const builder = new Builder();
			builder.append(buffer);
			blob = builder.getBlob(type);
		} else {
			blob = new window.Blob([buffer], {type});
		}
	} catch (e) {
		// alert(e)
	}
	return blob;
};

/**
 * 获取ticket
 * @param params
 * { api, bizId, ip, url, secretKey }
 * bizId 渠道区分
 * ip h5获取不到随意填入
 * url 对应使用的接口路径
 * secretKey 秘钥
 *
 * @returns {*}
 */
export const getOCRTicket = params => {
	const timestamp = new Date().Format('yyyyMMddhhmmss');
	const {api, bizId, ip, url} = params;
	const data = Object.assign({}, params, {timestamp});
	const sign = getOCRSign(data);
	const OCRData = Object.assign({}, {bizId, ip, url, timestamp, sign});
	let fetchGetParams = '';
	for (const item in OCRData) {
		fetchGetParams += (fetchGetParams.indexOf('?') != -1) ? '&' : '?';
		fetchGetParams += `${item}=${OCRData[item]}`;
	}
	return fetch(`${url}/api/v2/ticket${fetchGetParams}`, {
		method: 'GET',
	}).then(response => response.json());
};

/**
 * check OCR 图片信息
 * @param params
 * @returns {Promise}
 */
export const getOCRImgMsg = params => {
	const {formData, url, bizId, ticket} = params;

	return new Promise((resolve, reject) => {
		formData.append('ticket', ticket);
		formData.append('bizId', bizId);
		console.log(formData);
		fetch(`${url}/api/v2/image/upload`, {
			method: 'POST',
			header: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}).then(response => response.json())
			.then(data => {
				resolve(data);
			})
			.catch(err => {
				reject(err);
				// typeof err === 'string' ? YztApp.showToast(err) : null;
			});
	});
};
