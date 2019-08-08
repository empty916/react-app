import React, { Component } from 'react';
import classnames from 'classnames';
import Moment from 'moment';
import dynamicFormStyle from '../style.scss';

const isNull = value => {
	if (value === null || value === undefined || value === '' || value.length === 0) {
		return true;
	}
	return false;
};

class Text extends Component {
	render() {
		const {value, textValue, format, style, className, ...restProps} = this.props; // eslint-disable-line

		let showText = textValue || value;

		if (isNull(value)) {
			showText = '无';
		}
		if (Array.isArray(value) && value.length) {
			showText = textValue || value.join(',');
		}
		if (Moment.isMoment(value)) {
			showText = value.format(format);
		}
		const cls = classnames(className, dynamicFormStyle.text);
		return <div {...restProps} style={style} className={cls}>{showText}</div>;
	}
}

export default Text;
