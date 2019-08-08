// 普通form item布局
export const defaultFormItemLayout = {
	labelCol: {
		xs: {span: 24},
		sm: {span: 5},
	},
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 12},
	},
};

// 按钮布局
export const defaultButtonItemLayout = {
	wrapperCol: {
		xs: {span: 24},
		sm: {span: 12},
	},
};

// 最后一个item的布局
export const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

export const INPUT_TYPE = {
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
	TEXT: 'Text',
};

export const addInputType = type => {
	const upperCaseType = type.toUpperCase();
	if (!!INPUT_TYPE[upperCaseType]) {
		throw new Error(`${type} 已经存在！`);
	}
	INPUT_TYPE[upperCaseType] = type;
};

export const LAYOUT = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
	INLINE: 'inline',
};

export const defaultConfig = {
	type: 'input',
	rules: [{
		required: false,
	}],
	props: {
		type: 'text',
	},
};
