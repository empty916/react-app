import React from 'react';

import {
	Form,
	Select,
	InputNumber,
	Switch,
	Radio,
	Slider,
	Button,
	Rate,
	Input,
	Checkbox,
	DatePicker,
} from 'antd';

import Text from './Text';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

// export Radio;
// export Checkbox;
export const FormItem = Form.Item;
export const {Option} = Select;
export const RadioButton = Radio.Button;
export const RadioGroup = Radio.Group;
export const CheckboxGroup = Checkbox.Group;
export const {TextArea} = Input;
export const inputTypeMaps = {
	rate: Rate,
	button: Button,
	switch: Switch,
	select: Select,
	slider: Slider,
	input: Input,
	checkbox: CheckboxGroup,
	radio: RadioGroup,
	number: InputNumber,
	datePicker: DatePicker,
	monthPicker: MonthPicker,
	rangePicker: RangePicker,
	weekPicker: WeekPicker,
	textArea: TextArea,
	Text,
};

