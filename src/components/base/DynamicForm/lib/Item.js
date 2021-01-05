import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import {
	Radio,
	Checkbox,
} from 'antd';

import {
	inputTypeMaps,
	FormItem,
	Option,
} from './inputMap';


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
	constructor(props) {
		super(props);
		this.initValue(props.config.input.value);
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
		if (type === 'Text' && !!options) {
			let selectedOption = {};
			if (Array.isArray(value)) {
				selectedOption.text = options.filter(item => value.includes(item.value)).map(({text}) => text).join(',');
			} else {
				selectedOption = options.find(item => item.value === value);
			}
			_props.textValue = selectedOption ? selectedOption.text : value;
		}

		const optionsChildren = this.createOptions(type, options);
		let wrappedInput = <InputComponent {..._props} />;
		if (optionsChildren || children) {
			wrappedInput = <InputComponent {..._props}>{optionsChildren || children}</InputComponent>;
		}
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
	initValue(value) {
		this.initialValue = value;
	}
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
