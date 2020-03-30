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
