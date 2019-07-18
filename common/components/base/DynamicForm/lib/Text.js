'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('../style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNull = function isNull(value) {
	if (value === null || value === undefined || value === '' || value.length === 0) {
		return true;
	}
	return false;
};

var Text = function (_Component) {
	(0, _inherits3.default)(Text, _Component);

	function Text() {
		(0, _classCallCheck3.default)(this, Text);
		return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
	}

	(0, _createClass3.default)(Text, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    value = _props.value,
			    textValue = _props.textValue,
			    format = _props.format,
			    style = _props.style,
			    className = _props.className,
			    restProps = (0, _objectWithoutProperties3.default)(_props, ['value', 'textValue', 'format', 'style', 'className']); // eslint-disable-line

			var showText = textValue || value;

			if (isNull(value)) {
				showText = '无';
			}
			if (Array.isArray(value) && value.length) {
				showText = textValue || value.join(',');
			}
			if (_moment2.default.isMoment(value)) {
				showText = value.format(format);
			}
			var cls = (0, _classnames2.default)(className, _style2.default.text);
			return _react2.default.createElement(
				'div',
				(0, _extends3.default)({}, restProps, { style: style, className: cls }),
				showText
			);
		}
	}]);
	return Text;
}(_react.Component);

exports.default = Text;
module.exports = exports['default'];