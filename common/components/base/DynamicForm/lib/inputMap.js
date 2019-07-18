'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inputTypeMaps = exports.TextArea = exports.CheckboxGroup = exports.RadioGroup = exports.RadioButton = exports.Option = exports.FormItem = undefined;

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _slider = require('antd/lib/slider');

var _slider2 = _interopRequireDefault(_slider);

var _switch = require('antd/lib/switch');

var _switch2 = _interopRequireDefault(_switch);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _rate = require('antd/lib/rate');

var _rate2 = _interopRequireDefault(_rate);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

require('antd/lib/input-number/style/css');

require('antd/lib/slider/style/css');

require('antd/lib/switch/style/css');

require('antd/lib/button/style/css');

require('antd/lib/rate/style/css');

require('antd/lib/input/style/css');

require('antd/lib/checkbox/style/css');

require('antd/lib/radio/style/css');

require('antd/lib/select/style/css');

require('antd/lib/form/style/css');

require('antd/lib/date-picker/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonthPicker = _datePicker2.default.MonthPicker,
    RangePicker = _datePicker2.default.RangePicker,
    WeekPicker = _datePicker2.default.WeekPicker;

// export Radio;
// export Checkbox;

var FormItem = exports.FormItem = _form2.default.Item;
var Option = _select2.default.Option;
exports.Option = Option;
var RadioButton = exports.RadioButton = _radio2.default.Button;
var RadioGroup = exports.RadioGroup = _radio2.default.Group;
var CheckboxGroup = exports.CheckboxGroup = _checkbox2.default.Group;
var TextArea = _input2.default.TextArea;
exports.TextArea = TextArea;
var inputTypeMaps = exports.inputTypeMaps = {
	rate: _rate2.default,
	button: _button2.default,
	switch: _switch2.default,
	select: _select2.default,
	slider: _slider2.default,
	input: _input2.default,
	checkbox: CheckboxGroup,
	radio: RadioGroup,
	number: _inputNumber2.default,
	datePicker: _datePicker2.default,
	monthPicker: MonthPicker,
	rangePicker: RangePicker,
	weekPicker: WeekPicker,
	textArea: TextArea,
	Text: _Text2.default
};