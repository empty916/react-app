// 这是自动生成的文件，可以修改。

import React, {Component} from 'react';
import StepBar from 'StepBar';
import TemplateStep from './templateStep/';

import style from './style.scss';

class Template extends Component {
	componentWillMount() {}
	componentDidMount() {
	}
	componentWillUnmount() {

	}
	getType = () => {
		const { type } = this.props.location.query;
		return type;
	}
	isDetail = () => {
		const { type } = this.props.location.query;
		if (type === 'detail') {
			return true;
		}
		return false;
	}
	templateStep = (next, previous) => <TemplateStep next={next} previous={previous} type={this.getType()} />
	titles = [
		{
			title: '融资申请',
			content: this.templateStep,
		},
	];

	render() {
		return (
			<div className={style.template}>
				<StepBar StepContent={this.titles} isExpand={this.isDetail()} />
			</div>
		);
	}
}

export default Template;
