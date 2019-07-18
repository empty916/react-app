import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { Input } from 'antd';
import style from './style';

class PaInput extends Component {
	render() {
		const { status, errorTips, className, ...restProps } = this.props;
		const isErrorStatus = status === 'error';
		const inputCls = classnames(className, {
			[style['error-border']]: isErrorStatus,
			[style['error-color']]: isErrorStatus,
		});
		const wrapperCls = classnames(style['pa-input'], {
			[style['error-color']]: isErrorStatus,
		});
		return (
			<div className={wrapperCls}>
				<Input {...restProps} className={inputCls} />
				<br />
				{isErrorStatus ? errorTips : ''}
			</div>
		);
	}
}

PaInput.defaultProps = {
	status: 'normal',
};

PaInput.propTypes = {
	status: PropTypes.oneOf(['error', 'normal']),
	errorTips: PropTypes.string,
};

export default PaInput;
