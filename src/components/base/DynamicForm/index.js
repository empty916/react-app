import React from 'react';
import {Form} from 'antd';
import './style.scss';

import BaseForm from './lib/BaseForm';
import {addInputType} from './lib/config';
import {inputTypeMaps} from './lib/inputMap';
import InputFactory, {createInputFactory} from './lib/InputFactory';
import * as validators from './lib/validators';

/**
 * 添加用户自定义的组件
 * 自定义组件添加需要实现prop.onChange的调用以及prop.value的填充
 * 添加完成使用GetInput.is({type, prop, options})方式生成配置
 * @param type 'table'
 * @param component MyTable
 */
const extend = (type, component) => {
	if (!!inputTypeMaps[type]) {
		throw new Error(`${type} 已经存在!`);
	}
	addInputType(type);
	inputTypeMaps[type] = component;
};

// 受控组件，formFields的值更改时要用原内存地址，否则表单验证会有bug
const DynamicForm = Form.create({
	onFieldsChange(props, changedFields) {
		for (let key in changedFields) { // eslint-disable-line
			props.onChange({
				name: key,
				value: changedFields[key].value || '',
			});
		}
	},
})(BaseForm);

export {
	extend,
	InputFactory,
	validators,
	createInputFactory,
};

export default DynamicForm;
