"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createFormItem = exports.getUniqID = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUniqID = exports.getUniqID = function getUniqID() {
	return Math.random().toString(36).substr(2, 6);
};

var createFormItem = exports.createFormItem = function createFormItem(config) {
	var label = config.label,
	    itemProps = config.itemProps,
	    options = config.options,
	    type = config.type,
	    name = config.name,
	    value = config.value,
	    rules = config.rules,
	    children = config.children,
	    props = config.props,
	    fieldOption = config.fieldOption;

	var formItem = {
		props: {
			key: name || getUniqID()
		},
		input: {
			type: type
		}
	};
	formItem.input.value = value;
	formItem.props.label = label;
	formItem.input.name = name;
	formItem.input.children = children;
	formItem.input.props = props;
	formItem.input.options = options;
	formItem.rules = rules;
	formItem.fieldOption = fieldOption;
	formItem.props = (0, _extends3.default)({}, formItem.props, itemProps);
	return formItem;
};