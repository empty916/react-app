'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createInputFactory = exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 生成dynamicform配置的工具类
 */
var InputFactory = function () {
	function InputFactory() {
		var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		(0, _classCallCheck3.default)(this, InputFactory);
		this.input = {};

		if (typeof arg === 'string') {
			this.input = {
				label: arg,
				type: _config.defaultConfig.type
			};
		} else if ((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object') {
			if (arg instanceof InputFactory === true) {
				arg = arg.getInput();
			}
			this.init(arg);
		}
	}

	(0, _createClass3.default)(InputFactory, [{
		key: 'init',
		value: function init(input) {
			this.input = (0, _cloneDeep2.default)(input);
			return this;
		}
	}, {
		key: 'fieldOption',
		value: function fieldOption(config) {
			if (!this.input.fieldOption) {
				this.input.fieldOption = {};
			}
			this.input.fieldOption = (0, _extends3.default)({}, this.input.fieldOption, config);
			return this;
		}
	}, {
		key: 'rule',
		value: function rule(_rule) {
			if (!Array.isArray(this.input.rules)) {
				this.input.rules = [];
			}
			this.input.rules.push(_rule);
			return this;
		}
	}, {
		key: 'removeRules',
		value: function removeRules() {
			this.input.rules = [];
			return this;
		}
	}, {
		key: 'prop',
		value: function prop(_prop) {
			if (!this.input.props) {
				this.input.props = {};
			}
			this.input.props = (0, _extends3.default)({}, this.input.props, _prop);
			return this;
		}
	}, {
		key: 'itemProp',
		value: function itemProp(prop) {
			if (!this.input.itemProps) {
				this.input.itemProps = {};
			}
			this.input.itemProps = (0, _extends3.default)({}, this.input.itemProps, prop);
			return this;
		}
	}, {
		key: 'label',
		value: function label(_label) {
			this.input.label = _label;
			return this;
		}
	}, {
		key: 'trigger',
		value: function trigger() {
			var ListenerType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'onChange';

			return this.fieldOption({
				validateTrigger: ListenerType
			});
		}
	}, {
		key: 'span',
		value: function span(colNum) {
			if (!!colNum) {
				return this.itemProp({ span: colNum });
			}
			return this;
		}
	}, {
		key: 'layout',
		value: function layout(config) {
			if (!!config) {
				return this.itemProp(config);
			}
			return this;
		}
	}, {
		key: 'isButton',
		value: function isButton(text, onClick) {
			this.input = {
				// label,
				type: _config.INPUT_TYPE.BUTTON,
				props: { onClick: onClick }
			};
			return this;
		}
	}, {
		key: 'isDisable',
		value: function isDisable() {
			return this.prop({
				disabled: true
			});
		}
	}, {
		key: 'isEnable',
		value: function isEnable() {
			return this.prop({
				disabled: false
			});
		}
	}, {
		key: 'isRequired',
		value: function isRequired() {
			var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '\u8BF7\u8F93\u5165' + this.input.label + '!';

			return this.rule({
				required: true,
				message: message
			});
		}
	}, {
		key: 'isNotRequired',
		value: function isNotRequired() {
			if (Array.isArray(this.input.rules)) {
				var target = this.input.rules.find(function (rule) {
					return rule.required === true;
				});
				if (!!target) {
					target.required = false;
				}
			}
			return this;
			// return this.rule({
			// 	required: false,
			// });
		}
	}, {
		key: 'ph',
		value: function ph() {
			var placeholder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '\u8BF7\u8F93\u5165' + this.input.label;

			return this.prop({ placeholder: placeholder });
		}

		/**
   * 为表单元素添加验证方法
   * 可以是已经存在的验证type，或者自定义的验证方法
   * @param validator function
   * @returns {InputFactory}
   */

	}, {
		key: 'validator',
		value: function validator(_validator) {
			if (!_validator) {
				throw new Error('没有validator参数');
			}
			if (typeof _validator !== 'function') {
				throw new Error('validator参数应该是一个函数！');
			}
			return this.rule({ validator: _validator });
		}
	}, {
		key: 'on',
		value: function on(ListenerName, listener) {
			var lowerCaseReg = /^[a-z]*$/;
			if (lowerCaseReg.test(ListenerName.charAt(0))) {
				throw new Error('\u4E8B\u4EF6\u540D\u79F0\uFF1A' + ListenerName + '\u7684\u9996\u5B57\u6BCD\u5E94\u8BE5\u662F\u5927\u5199\uFF01');
			}
			return this.prop((0, _defineProperty3.default)({}, 'on' + ListenerName, listener));
		}
	}, {
		key: 'isPassword',
		value: function isPassword() {
			return this.prop({
				type: 'password'
			});
		}
	}, {
		key: 'isRadio',
		value: function isRadio(options) {
			if (!options) throw new Error('没有传options');
			this.input.type = _config.INPUT_TYPE.RADIO;
			this.input.options = options;
			return this;
		}
	}, {
		key: 'isCheckbox',
		value: function isCheckbox(options) {
			if (!options) throw new Error('没有传options');
			this.input.type = _config.INPUT_TYPE.CHECKBOX;
			this.input.options = options;
			return this;
		}

		// select框带搜索功能时，的过滤选项方法

	}, {
		key: 'filterOption',
		value: function filterOption(input, option) {
			// eslint-disable-line
			var reg = new RegExp(input, 'i');
			return reg.test(option.props.children);
		}
	}, {
		key: 'isSelect',
		value: function isSelect(options) {
			var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { showSearch: false, multiple: false };
			var showSearch = config.showSearch,
			    multiple = config.multiple;

			if (!options) throw new Error('没有传options');
			this.input.type = _config.INPUT_TYPE.SELECT;
			this.input.options = options;
			if (showSearch) {
				this.prop({
					filterOption: this.filterOption,
					showSearch: showSearch
				});
			}
			if (multiple) {
				this.prop({
					mode: 'multiple'
				});
			}
			return this;
		}
	}, {
		key: 'isDatePicker',
		value: function isDatePicker() {
			var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YYYY-MM-DD';

			this.input.type = _config.INPUT_TYPE.DATEPICKER;
			return this.prop({
				format: format
			});
		}
	}, {
		key: 'isDateRangePicker',
		value: function isDateRangePicker() {
			var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YYYY-MM-DD';

			this.input.type = _config.INPUT_TYPE.RANGEPICKER;
			return this.prop({
				format: format
			});
		}
	}, {
		key: 'isTextArea',
		value: function isTextArea() {
			this.input.type = _config.INPUT_TYPE.TEXTAREA;
			return this;
		}
	}, {
		key: 'isText',
		value: function isText() {
			this.input.type = _config.INPUT_TYPE.TEXT;
			return this;
		}
	}, {
		key: 'is',
		value: function is(_ref) {
			var type = _ref.type,
			    prop = _ref.prop,
			    options = _ref.options;

			var _type = type.toUpperCase();
			if (!_config.INPUT_TYPE[_type]) {
				throw new Error(type + ' \u7C7B\u578B\u7684\u7EC4\u4EF6\u4E0D\u5B58\u5728\uFF01');
			}

			this.input.type = _config.INPUT_TYPE[_type];
			/* eslint-disable */
			!!options && (this.input.options = options);
			!!prop && this.prop(prop);
			/* eslint-enable */
			return this;
		}
	}, {
		key: 'clone',
		value: function clone() {
			return new InputFactory(this);
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return (0, _extends3.default)({}, this.input);
		}
	}]);
	return InputFactory;
}();

exports.default = InputFactory;
var createInputFactory = exports.createInputFactory = function createInputFactory(label) {
	return new InputFactory(label);
};