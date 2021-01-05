import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import {Form, Row, Col} from 'antd';
import InputFactory from './InputFactory';
import MyFormItem from './Item';
import {createFormItem} from './utils';
import {
	defaultFormItemLayout,
	// defaultButtonItemLayout,
	// tailFormItemLayout,
	LAYOUT,
} from './config';

// const FormItem = Form.Item;

class BaseForm extends Component {
	static LAYOUT = LAYOUT;

	componentDidUpdate() {
		this.setInitialValue(this.props.formFields);
	}

	onSubmit = e => {
		const {onSubmit, form} = this.props;
		e.preventDefault();
		form.validateFieldsAndScroll(onSubmit);
	};

	getFieldsValue = () => this.form.getFieldsValue();

	setInitialValue = formFields => this.initialValue = this.formatFormValues(this.filterNoConfigFields(formFields));
	setFields = formFields => this.props.form.setFields(this.formatFormValues(this.filterNoConfigFields(formFields)));
	setFieldsValue = formFields => this.props.form.setFieldsValue(this.filterNoConfigFields(formFields));

	getFormItemLayout = () => {
		const {layout} = this.props;
		const formItemLayout = layout === LAYOUT.HORIZONTAL ? defaultFormItemLayout : null;
		// const buttonItemLayout = layout === LAYOUT.HORIZONTAL ? defaultButtonItemLayout : null;
		return formItemLayout;
	};
	getChildren = () => {
		return this.props.children;
	};
	filterNoConfigFields = formFields => {
		const { fieldsConfig } = this.props;
		const newFormFields = Object.keys(fieldsConfig)
			.filter(key => formFields[key] !== undefined)
			.reduce((obj, key) => {
				obj[key] = formFields[key];
				return obj;
			}, {});
		return newFormFields;
	}

	createFormItemByConfig = formItemConfig => {
		const itemLayout = this.getFormItemLayout();
		const { form, formItemLayout } = this.props;
		const _formItemLayout = { ...formItemLayout };
		const layoutProps = ['span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
		layoutProps.forEach(layoutProp => {
			if (!!formItemConfig.props[layoutProp]) {
				_formItemLayout[layoutProp] = formItemConfig.props[layoutProp];
			}
		});
		const { getFieldDecorator } = form;
		if (!!_formItemLayout && Object.keys(_formItemLayout).length) {
			return (
				<Col {..._formItemLayout} key={formItemConfig.input.name} style={{minHeight: '70px'}}>
					<MyFormItem
						getFieldDecorator={getFieldDecorator}
						layout={itemLayout}
						config={formItemConfig}
					/>
				</Col>
			);
		}
		return (
			<MyFormItem
				key={formItemConfig.input.name}
				getFieldDecorator={getFieldDecorator}
				layout={itemLayout}
				config={formItemConfig}
			/>
		);
	};

	validateFieldsAndScroll = cb => this.props.form.validateFieldsAndScroll(cb);

	/**
	 * 数据格式转换
	 * { name: 'tom' } => { name: { value: 'tom; } }
	 * @param values
	 * @returns {{}}
	 */
	formatFormValues = values => {
		const res = {};

		for (let key in values) { // eslint-disable-line
			res[key] = {value: values[key]};
		}
		return res;
	};

	resetFields = resetValue => {
		if (resetValue) {
			this.props.form.setFields(this.formatFormValues(this.filterNoConfigFields(resetValue)));
		} else {
			setTimeout(() => this.props.form.setFields(this.initialValue), 16);
		}
	};

	/* eslint-disable */
	createFormItemsConfig({formFields, fieldsConfig}) {
		const formItems = [];
		for (let key in formFields) {
			if (formFields.hasOwnProperty(key) && fieldsConfig.hasOwnProperty(key)) {
				let fieldConfig = fieldsConfig[key];

				if (fieldConfig instanceof InputFactory) {
					fieldConfig = fieldConfig.getInput();
				}
				const params = {
					...fieldConfig,
					name: key,
					value: formFields[key],
				};
				formItems.push(createFormItem(params));
			}
		}
		return formItems;
	}
	/* eslint-enable */

	render() {
		const {layout, gutter} = this.props;
		const {className, style} = this.props;
		const formItems = this.createFormItemsConfig(this.props);
		const formProps = {
			style,
			className,
			layout,
			onSubmit: this.onSubmit,
		};
		const formCls = classnames('dynamic-form', className);
		return (
			<Form {...formProps} className={formCls}>
				<Row gutter={gutter}>
					{formItems.map(this.createFormItemByConfig)}
					{this.getChildren()}
				</Row>
			</Form>
		);
	}
}

BaseForm.defaultProps = {
	layout: LAYOUT.HORIZONTAL,
	onChange: () => {
	},
	onSubmit: () => {
	},
	formItemLayout: {},
	gutter: 0,
};
BaseForm.propTypes = {
	formFields: PropTypes.object.isRequired, // eslint-disable-line
	fieldsConfig: PropTypes.object.isRequired, // eslint-disable-line
	layout: PropTypes.oneOf([LAYOUT.HORIZONTAL, LAYOUT.INLINE, LAYOUT.VERTICAL]),
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	formItemLayout: PropTypes.object, // eslint-disable-line
	gutter: PropTypes.number,
};

export default BaseForm;
