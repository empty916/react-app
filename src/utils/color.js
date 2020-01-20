import pipe from 'lodash/fp/pipe';
import Color from 'color';

const hexColorStrWithHeaderReg = /^#(([0-9a-z]{3})|([0-9a-z]{6}))$/i;
const hexColorStrWithOutHeaderReg = /^(([0-9a-z]{3})|([0-9a-z]{6}))$/i;
const rgbaColorStrReg = /^rgb(a)?\(([\d.]{1,3}(,)?(\s)?){3,4}\)$/i;

/**
 * 校验、并过滤，16进制颜色的‘#’
 * @param {*} hexColorStr
 */
function filterHexColorHeader(hexColorStr) {
	if (
		!hexColorStrWithHeaderReg.test(hexColorStr)
		&& !hexColorStrWithOutHeaderReg.test(hexColorStr)
	) {
		throw new Error('hex color format error!');
	}
	if (hexColorStrWithHeaderReg.test(hexColorStr)) {
		return hexColorStr.slice(1);
	}
	return hexColorStr;
}
function pad2(num) {
	let t = num.toString(16);
	if (t.length === 1) t = `0${t}`;
	return t;
}
function _toNum3(colorStr) {
	if (colorStr.length === 3) {
		colorStr =			colorStr[0]
			+ colorStr[0]
			+ colorStr[1]
			+ colorStr[1]
			+ colorStr[2]
			+ colorStr[2];
	}
	const r = parseInt(colorStr.slice(0, 2), 16);
	const g = parseInt(colorStr.slice(2, 4), 16);
	const b = parseInt(colorStr.slice(4, 6), 16);
	return [r, g, b];
}
const toNum3 = pipe(filterHexColorHeader, _toNum3);

function mix(color1, color2, weight1, alpha1, alpha2) {
	color1 = color1.replace('#', '');
	color2 = color2.replace('#', '');
	if (weight1 === undefined) weight1 = 0.5;
	if (alpha1 === undefined) alpha1 = 1;
	if (alpha2 === undefined) alpha2 = 1;

	const w = 2 * weight1 - 1;
	const alphaDelta = alpha1 - alpha2;
	const w1 = ((w * alphaDelta === -1 ? w : (w + alphaDelta) / (1 + w * alphaDelta)) + 1) / 2;
	const w2 = 1 - w1;

	const nums1 = toNum3(color1);
	const nums2 = toNum3(color2);
	const r = Math.round(w1 * nums1[0] + w2 * nums2[0]);
	const g = Math.round(w1 * nums1[1] + w2 * nums2[1]);
	const b = Math.round(w1 * nums1[2] + w2 * nums2[2]);
	return `#${pad2(r)}${pad2(g)}${pad2(b)}`;
}

/**
 * 改变颜色深度
 * @param {*} colorStr 16进制格式的颜色字符串
 * @param {*} rate 比率0-1
 */
function rgba(colorStr, rate) {
	const nums = toNum3(colorStr);
	let r = nums[0];
	let g = nums[1];
	let b = nums[2];
	return (
		(r = Math.round((1 - rate) * r)),
		(g = Math.round((1 - rate) * g)),
		(b = Math.round((1 - rate) * b)),
		(r = pad2(r)),
		(g = pad2(g)),
		(b = pad2(b)),
		`#${r}${g}${b}`
	);
}

/**
 * 转化16进制的颜色值为rgba的颜色值
 * 如果传入rgba格式的颜色，则直接返回，不作处理
 * @param {*} colorStr 16进制的颜色值 #fff、#ffffff
 * @param {*} opacity 透明度
 */
function toRgbaColor(colorStr, opacity = 1) {
	if (typeof colorStr !== 'string') {
		throw new Error('color str should be string type');
	}
	if (rgbaColorStrReg.test(colorStr)) {
		const numPikcerReg = /(\d+,)/g;
		const rgbArr = colorStr.match(numPikcerReg).join('').split(',');
		rgbArr.length = 3;
		return `rgba(${rgbArr.join(',')}, ${opacity})`;
	}
	if (colorStr.startsWith('#')) {
		colorStr = colorStr.slice(1);
	}
	return `rgba(${toNum3(colorStr).join(',')}, ${opacity})`;
}

/**
 * 转换rgba格式的颜色值到16进制的颜色值
 * 如果是16进制的颜色，则直接返回
 * @param {*} rgbaColorStr rgba格式的颜色值
 * return 16进制的颜色值
 */
function toHexColor(rgbaColorStr) {
	if (
		hexColorStrWithHeaderReg.test(rgbaColorStr)
		|| hexColorStrWithOutHeaderReg.test(rgbaColorStr)
	) {
		return rgbaColorStr;
	}
	if (!rgbaColorStrReg.test(rgbaColorStr)) {
		throw new Error('rgba color format error!');
	}
	const numPikcerReg = /(\d+,)/g;
	const rgbArr = rgbaColorStr.match(numPikcerReg).join('').split(',');
	const rate = 0;
	let r = rgbArr[0];
	let g = rgbArr[1];
	let b = rgbArr[2];
	return (
		(r = Math.round((1 - rate) * r)),
		(g = Math.round((1 - rate) * g)),
		(b = Math.round((1 - rate) * b)),
		(r = pad2(r)),
		(g = pad2(g)),
		(b = pad2(b)),
		`#${r}${g}${b}`
	);
}

/**
 * 淡化颜色
 * @param {*} colorStr 颜色值，支持16进制的颜色和rgba格式
 * @param {*} weight 淡化比重 0-1
 */
function lighten(colorStr, weight) {
	colorStr = toHexColor(colorStr);
	return mix('fff', colorStr, weight);
}

/**
 * 加深颜色
 * @param {*} colorStr 颜色值，支持16进制的颜色和rgba格式
 * @param {*} weight 淡化比重 0-1
 */
function darken(colorStr, weight) {
	colorStr = toHexColor(colorStr);
	return mix('000', colorStr, weight);
}


class _Color extends Color {
	lighten(ratio) {
		const oldValue = this.string();
		super.lighten(ratio);
		const newValue = this.string();
		if (oldValue === newValue) {
			return new _Color(lighten(oldValue, ratio));
		}
		return this;
	}
}

export default _Color;

// export {
// 	lighten, // 淡化
// 	darken, // 加深
// 	mix, // 混合
// 	toNum3,
// 	rgba,
// 	toRgbaColor,
// 	toHexColor,
// 	pad2,
// };
