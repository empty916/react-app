export const phoneValidator = (rule, value, callback) => {
	const numReg = /^[\d-]*$/; // 电话限定字符串正则
	const phoneReg = /^1\d{10}$/; // 手机正则
	const telReg = /^\d{3,4}-?\d{3,8}$/; // 固定电话正则

	if (!value) {
		return callback();
	}
	if (!numReg.test(value)) {
		callback('电话必须是数字或者"-"！');
	} else if (!phoneReg.test(value) && !telReg.test(value)) {
		callback('电话格式错误！');
	}
	// Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
	return callback();
};

export const numValidator = (rule, value, callback) => {
	if (!value) {
		return callback();
	}

	if (!/^\d*$/.test(value)) {
		callback('必须是数字！');
	}
	// Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
	return callback();
};

export const moneyValidator = (rule, value, callback) => {
	if (!value) {
		return callback();
	}

	if (!/^-?\d+(\.\d*)?$/.test(value)) {
		callback('请输入正确的金额格式！');
	}
	// Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
	return callback();
};

