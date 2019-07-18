'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createInputFactory = exports.validators = exports.InputFactory = exports.extend = undefined;

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

require('antd/lib/form/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.scss');

var _BaseForm = require('./lib/BaseForm');

var _BaseForm2 = _interopRequireDefault(_BaseForm);

var _config = require('./lib/config');

var _inputMap = require('./lib/inputMap');

var _InputFactory = require('./lib/InputFactory');

var _InputFactory2 = _interopRequireDefault(_InputFactory);

var _validators = require('./lib/validators');

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 添加用户自定义的组件
 * 自定义组件添加需要实现prop.onChange的调用以及prop.value的填充
 * 添加完成使用GetInput.is({type, prop, options})方式生成配置
 * @param type 'table'
 * @param component MyTable
 */
var extend = function extend(type, component) {
	if (!!_inputMap.inputTypeMaps[type]) {
		throw new Error(type + ' \u5DF2\u7ECF\u5B58\u5728!');
	}
	(0, _config.addInputType)(type);
	_inputMap.inputTypeMaps[type] = component;
};

// 受控组件，formFields的值更改时要用原内存地址，否则表单验证会有bug
var DynamicForm = _form2.default.create({
	onFieldsChange: function onFieldsChange(props, changedFields) {
		for (var key in changedFields) {
			// eslint-disable-line
			props.onChange({
				name: key,
				value: changedFields[key].value || ''
			});
		}
	}
})(_BaseForm2.default);

exports.extend = extend;
exports.InputFactory = _InputFactory2.default;
exports.validators = validators;
exports.createInputFactory = _InputFactory.createInputFactory;
exports.default = DynamicForm;