'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// 普通form item布局
var defaultFormItemLayout = exports.defaultFormItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 }
	}
};

// 按钮布局
var defaultButtonItemLayout = exports.defaultButtonItemLayout = {
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 }
	}
};

// 最后一个item的布局
var tailFormItemLayout = exports.tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};

var INPUT_TYPE = exports.INPUT_TYPE = {
	RATE: 'rate',
	BUTTON: 'button',
	SWITCH: 'switch',
	SELECT: 'select',
	SLIDER: 'slider',
	INPUT: 'input',
	CHECKBOX: 'checkbox',
	RADIO: 'radio',
	NUMBER: 'number',
	DATEPICKER: 'datePicker',
	MONTHPICKER: 'monthPicker',
	RANGEPICKER: 'rangePicker',
	WEEKPICKER: 'weekPicker',
	TEXTAREA: 'textArea',
	TEXT: 'Text'
};

var addInputType = exports.addInputType = function addInputType(type) {
	var upperCaseType = type.toUpperCase();
	if (!!INPUT_TYPE[upperCaseType]) {
		throw new Error(type + ' \u5DF2\u7ECF\u5B58\u5728\uFF01');
	}
	INPUT_TYPE[upperCaseType] = type;
};

var LAYOUT = exports.LAYOUT = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
	INLINE: 'inline'
};

var defaultConfig = exports.defaultConfig = {
	type: 'input',
	rules: [{
		required: false
	}],
	props: {
		type: 'text'
	}
};