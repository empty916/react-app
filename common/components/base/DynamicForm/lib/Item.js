import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import equal from 'lodash/isEqual';

import {
	Radio,
	Checkbox,
} from 'antd';

import {
	inputTypeMaps,
	FormItem,
	Option,
} from './inputMap';

/* eslint-disable */
import {
	INPUT_TYPE,
	defaultConfig,
} from './config';

const optionsComponents = {
	[INPUT_TYPE.SELECT]: Option,
	[INPUT_TYPE.RADIO]: Radio,
	[INPUT_TYPE.CHECKBOX]: Checkbox,
};

class MyFormItem extends Component {
	componentWillReceiveProps(nextProps) {
		console.log(this.props.config.input.name, equal(nextProps, this.props), nextProps === this.props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const start = performance.now();
		const isEqual = equal(nextProps, this.props);
		console.log(performance.now() - start);
		return !isEqual;
	}

	getFormItemComponent = ({input, rules, fieldOption}) => {
		const {
			type = defaultConfig.type,
			name,
			props,
			value,
			options,
			children,
		} = input;

		const {getFieldDecorator} = this.props;
		const InputComponent = inputTypeMaps[type];
		const FormFieldOptions = {
			rules: rules || defaultConfig.rules,
			...fieldOption,
			initialValue: value,
		};
		const _props = { ...props };
		// 当组件是，详情预览模式时，并且，存在options配置，说明当前的组件是Select、Radio之类的组件，
		// 此时的预览的值需要处理，因为Text组件只支持string渲染
		/**
		 * demo data
		 * option = [{
		 * 	value: 0,
		 * 	text: '零'}，
		 * {
		 * 	value: 1,
		 * 	text: '一'
		 * }，{
		 * 	value: 2,
		 * 	text: '二'
		 * }，{
		 * 	value: 3,
		 * 	text: '三'
		 * }]
		 * value
		 * 单选：value = 1；
		 * 多选：value = [0, 1]；
		 */
		if (type === 'Text' && !!options) {
			let selectedOption = {};
			// 多选 value = [0, 1]；
			if (Array.isArray(value)) {
				// selectedOption.text = '零，一'
				selectedOption.text = options.filter(item => value.includes(item.value)).map(({text}) => text).join(',');
			} else { // 单选 value = 1；
				// selectedOption = {value: 1, text: '一'}
				selectedOption = options.find(item => item.value === value);
			}
			_props.textValue = selectedOption ? selectedOption.text : value;
		}

		const optionsChildren = this.createOptions(type, options);
		let wrappedInput = <InputComponent {..._props} />;
		if (optionsChildren || children) {
			wrappedInput = <InputComponent {..._props}>{optionsChildren || children}</InputComponent>;
		}
		// console.log(getFieldDecorator(name, FormFieldOptions)(wrappedInput));
		return getFieldDecorator(name, FormFieldOptions)(wrappedInput);
	};

	createOptions = (type, options) => {
		if (!type || !options) return null;

		const Comp = optionsComponents[type] || Option;
		const optionsChildren = options.map((item, index) => {
			const {text, ...optionProps} = item;
			return <Comp key={text || index} {...optionProps}>{text}</Comp>;
		});
		return optionsChildren;
	};
	render() {
		const {layout, config} = this.props;
		const itemProps = config.props;
		return (
			<FormItem {...layout} {...itemProps}>
				{this.getFormItemComponent(config)}
			</FormItem>
		);
	}
}

MyFormItem.prototypes = {
	layout: PropTypes.object.isRequired,
	config: PropTypes.object.isRequired,
	getFieldDecorator: PropTypes.func.isRequired,
};

export default MyFormItem;
