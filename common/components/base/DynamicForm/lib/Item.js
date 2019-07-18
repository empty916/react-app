'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _optionsComponents, _class, _temp, _initialiseProps;

require('antd/lib/checkbox/style/css');

require('antd/lib/radio/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _inputMap = require('./inputMap');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionsComponents = (_optionsComponents = {}, (0, _defineProperty3.default)(_optionsComponents, _config.INPUT_TYPE.SELECT, _inputMap.Option), (0, _defineProperty3.default)(_optionsComponents, _config.INPUT_TYPE.RADIO, _radio2.default), (0, _defineProperty3.default)(_optionsComponents, _config.INPUT_TYPE.CHECKBOX, _checkbox2.default), _optionsComponents);

var MyFormItem = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(MyFormItem, _Component);

	function MyFormItem(props) {
		(0, _classCallCheck3.default)(this, MyFormItem);

		var _this = (0, _possibleConstructorReturn3.default)(this, (MyFormItem.__proto__ || (0, _getPrototypeOf2.default)(MyFormItem)).call(this, props));

		_initialiseProps.call(_this);

		_this.initValue(props.config.input.value);
		return _this;
	}

	(0, _createClass3.default)(MyFormItem, [{
		key: 'initValue',
		value: function initValue(value) {
			this.initialValue = value;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    layout = _props2.layout,
			    config = _props2.config;

			var itemProps = config.props;
			return _react2.default.createElement(
				_inputMap.FormItem,
				(0, _extends3.default)({}, layout, itemProps),
				this.getFormItemComponent(config)
			);
		}
	}]);
	return MyFormItem;
}(_react.Component), _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.getFormItemComponent = function (_ref) {
		var input = _ref.input,
		    rules = _ref.rules,
		    fieldOption = _ref.fieldOption;
		var _input$type = input.type,
		    type = _input$type === undefined ? _config.defaultConfig.type : _input$type,
		    name = input.name,
		    props = input.props,
		    value = input.value,
		    options = input.options,
		    children = input.children;
		var getFieldDecorator = _this2.props.getFieldDecorator;

		var InputComponent = _inputMap.inputTypeMaps[type];
		var FormFieldOptions = (0, _extends3.default)({
			rules: rules || _config.defaultConfig.rules
		}, fieldOption, {
			initialValue: value
		});
		var _props = (0, _extends3.default)({}, props);
		if (type === 'Text' && !!options) {
			var selectedOption = {};
			if (Array.isArray(value)) {
				selectedOption.text = options.filter(function (item) {
					return value.includes(item.value);
				}).map(function (_ref2) {
					var text = _ref2.text;
					return text;
				}).join(',');
			} else {
				selectedOption = options.find(function (item) {
					return item.value === value;
				});
			}
			_props.textValue = selectedOption ? selectedOption.text : value;
		}

		var optionsChildren = _this2.createOptions(type, options);
		var wrappedInput = _react2.default.createElement(InputComponent, _props);
		if (optionsChildren || children) {
			wrappedInput = _react2.default.createElement(
				InputComponent,
				_props,
				optionsChildren || children
			);
		}
		return getFieldDecorator(name, FormFieldOptions)(wrappedInput);
	};

	this.createOptions = function (type, options) {
		if (!type || !options) return null;

		var Comp = optionsComponents[type] || _inputMap.Option;
		var optionsChildren = options.map(function (item, index) {
			var text = item.text,
			    optionProps = (0, _objectWithoutProperties3.default)(item, ['text']);

			return _react2.default.createElement(
				Comp,
				(0, _extends3.default)({ key: text || index }, optionProps),
				text
			);
		});
		return optionsChildren;
	};
}, _temp);


MyFormItem.prototypes = {
	layout: _propTypes.PropTypes.object.isRequired,
	config: _propTypes.PropTypes.object.isRequired,
	getFieldDecorator: _propTypes.PropTypes.func.isRequired
};

exports.default = MyFormItem;
module.exports = exports['default'];