'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

require('antd/lib/form/style/css');

require('antd/lib/row/style/css');

require('antd/lib/col/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputFactory = require('./InputFactory');

var _InputFactory2 = _interopRequireDefault(_InputFactory);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _utils = require('./utils');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const FormItem = Form.Item;

var BaseForm = (_temp2 = _class = function (_Component) {
	(0, _inherits3.default)(BaseForm, _Component);

	function BaseForm() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, BaseForm);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BaseForm.__proto__ || (0, _getPrototypeOf2.default)(BaseForm)).call.apply(_ref, [this].concat(args))), _this), _this.onSubmit = function (e) {
			var _this$props = _this.props,
			    onSubmit = _this$props.onSubmit,
			    form = _this$props.form;

			e.preventDefault();
			form.validateFieldsAndScroll(onSubmit);
		}, _this.getFieldsValue = function () {
			return _this.form.getFieldsValue();
		}, _this.setInitialValue = function (formFields) {
			return _this.initialValue = _this.formatFormValues(_this.filterNoConfigFields(formFields));
		}, _this.setFields = function (formFields) {
			return _this.props.form.setFields(_this.formatFormValues(_this.filterNoConfigFields(formFields)));
		}, _this.setFieldsValue = function (formFields) {
			return _this.props.form.setFieldsValue(_this.filterNoConfigFields(formFields));
		}, _this.getFormItemLayout = function () {
			var layout = _this.props.layout;

			var formItemLayout = layout === _config.LAYOUT.HORIZONTAL ? _config.defaultFormItemLayout : null;
			// const buttonItemLayout = layout === LAYOUT.HORIZONTAL ? defaultButtonItemLayout : null;
			return formItemLayout;
		}, _this.getChildren = function () {
			if (_this.props.small) {
				return _react2.default.Children.map(_this.props.children, function (child) {
					return _react2.default.cloneElement(child, { size: 'small' });
				});
			}
			return _this.props.children;
		}, _this.filterNoConfigFields = function (formFields) {
			var fieldsConfig = _this.props.fieldsConfig;

			var newFormFields = (0, _keys2.default)(fieldsConfig).filter(function (key) {
				return formFields[key] !== undefined;
			}).reduce(function (obj, key) {
				obj[key] = formFields[key];
				return obj;
			}, {});
			return newFormFields;
		}, _this.addSmallProps = function (params) {
			if (!params.props) {
				params.props = {};
			}
			if (!params.itemProps) {
				params.itemProps = {};
			}

			if (_this.props.small) {
				params.props.className = 'small';
				params.props.size = 'small';
				params.itemProps.style = {
					marginBottom: 0
				};
			}
		}, _this.createFormItemByConfig = function (formItemConfig) {
			var itemLayout = _this.getFormItemLayout();
			var _this$props2 = _this.props,
			    form = _this$props2.form,
			    formItemLayout = _this$props2.formItemLayout;

			var _formItemLayout = (0, _extends3.default)({}, formItemLayout);
			var layoutProps = ['span', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
			layoutProps.forEach(function (layoutProp) {
				if (!!formItemConfig.props[layoutProp]) {
					_formItemLayout[layoutProp] = formItemConfig.props[layoutProp];
				}
			});
			var getFieldDecorator = form.getFieldDecorator;

			if (!!_formItemLayout && (0, _keys2.default)(_formItemLayout).length) {
				return _react2.default.createElement(
					_col2.default,
					(0, _extends3.default)({}, _formItemLayout, { key: formItemConfig.input.name, style: { minHeight: '70px' } }),
					_react2.default.createElement(_Item2.default, {
						getFieldDecorator: getFieldDecorator,
						layout: itemLayout,
						config: formItemConfig
					})
				);
			}
			return _react2.default.createElement(_Item2.default, {
				key: formItemConfig.input.name,
				getFieldDecorator: getFieldDecorator,
				layout: itemLayout,
				config: formItemConfig
			});
		}, _this.validateFieldsAndScroll = function (cb) {
			return _this.props.form.validateFieldsAndScroll(cb);
		}, _this.formatFormValues = function (values) {
			var res = {};

			for (var key in values) {
				// eslint-disable-line
				res[key] = { value: values[key] };
			}
			return res;
		}, _this.resetFields = function (resetValue) {
			if (resetValue) {
				_this.props.form.setFields(_this.formatFormValues(_this.filterNoConfigFields(resetValue)));
			} else {
				setTimeout(function () {
					return _this.props.form.setFields(_this.initialValue);
				}, 16);
			}
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(BaseForm, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.setInitialValue(this.props.formFields);
		}

		/**
   * 数据格式转换
   * { name: 'tom' } => { name: { value: 'tom; } }
   * @param values
   * @returns {{}}
   */

	}, {
		key: 'createFormItemsConfig',


		/* eslint-disable */
		value: function createFormItemsConfig(_ref2) {
			var formFields = _ref2.formFields,
			    fieldsConfig = _ref2.fieldsConfig;

			var formItems = [];
			for (var key in formFields) {
				if (formFields.hasOwnProperty(key) && fieldsConfig.hasOwnProperty(key)) {
					var fieldConfig = fieldsConfig[key];

					if (fieldConfig instanceof _InputFactory2.default) {
						fieldConfig = fieldConfig.getInput();
					}
					var params = (0, _extends3.default)({}, fieldConfig, {
						name: key,
						value: formFields[key]
					});
					// this.addSmallProps(params);
					formItems.push((0, _utils.createFormItem)(params));
				}
			}
			return formItems;
		}
		/* eslint-enable */

	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    layout = _props.layout,
			    gutter = _props.gutter;
			var _props2 = this.props,
			    className = _props2.className,
			    style = _props2.style;

			var formItems = this.createFormItemsConfig(this.props);
			var formProps = {
				style: style,
				className: className,
				layout: layout,
				onSubmit: this.onSubmit
			};
			var formCls = (0, _classnames2.default)('dynamic-form', className);
			return _react2.default.createElement(
				_form2.default,
				(0, _extends3.default)({}, formProps, { className: formCls }),
				_react2.default.createElement(
					_row2.default,
					{ gutter: gutter },
					formItems.map(this.createFormItemByConfig),
					this.getChildren()
				)
			);
		}
	}]);
	return BaseForm;
}(_react.Component), _class.LAYOUT = _config.LAYOUT, _temp2);


BaseForm.defaultProps = {
	layout: _config.LAYOUT.HORIZONTAL,
	small: false,
	onChange: function onChange() {},
	onSubmit: function onSubmit() {},
	formItemLayout: {},
	gutter: 0
};
BaseForm.propTypes = {
	formFields: _propTypes.PropTypes.object.isRequired, // eslint-disable-line
	fieldsConfig: _propTypes.PropTypes.object.isRequired, // eslint-disable-line
	layout: _propTypes.PropTypes.oneOf([_config.LAYOUT.HORIZONTAL, _config.LAYOUT.INLINE, _config.LAYOUT.VERTICAL]),
	small: _propTypes.PropTypes.bool,
	onChange: _propTypes.PropTypes.func,
	onSubmit: _propTypes.PropTypes.func,
	formItemLayout: _propTypes.PropTypes.object, // eslint-disable-line
	gutter: _propTypes.PropTypes.number
};

exports.default = BaseForm;
module.exports = exports['default'];