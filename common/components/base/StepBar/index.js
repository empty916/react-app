import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import HeaderTitle from 'HeaderTitle';
import { Steps } from 'antd';
import style from './style';

const { Step } = Steps;

const Wrapper = props => <div {...props} />;

class StepBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
		};
	}
	nextStep = () => {
		const { current } = this.state;
		const { StepContent } = this.props;
		if (current && current >= StepContent.length - 1) {
			return;
		}
		this.setState({current: current + 1});
	}
	Previous = () => {
		const { current } = this.state;
		if (current === 0) {
			return;
		}
		this.setState({current: current - 1});
	}
	// 步骤过程：每一步是否展开 isExpand默认值是false 不展开，为true的时候展开每一步
	// StepContent：页面传入的数组数据  current：步骤中的页面结构   isExpand：变量
	stepProcess = (StepContent, current, isExpand) => {
		if (isExpand) {
			return StepContent.map((item, index) =>
				(<HeaderTitle key={index.toString()} title={item.title}>{ item.content() }</HeaderTitle>));
		}
		return StepContent.map((item, index) =>
			<Step key={index.toString()} title={item.title} description={index === current && item.content(this.nextStep, this.Previous)} />);
	}
	render() {
		const { current } = this.state;
		const { StepContent, isExpand } = this.props;
		const RenderWrapper = isExpand ? Wrapper : Steps;
		return (
			<div>
				<RenderWrapper current={current} size="small" direction="vertical" labelplacement='vertical'>
					{this.stepProcess(StepContent, current, isExpand)}
				</RenderWrapper>
			</div>
		);
	}
}

StepBar.defaultProps = {
	isExpand: false,
};

StepBar.propTypes = {
	isExpand: PropTypes.bool,
};

export default StepBar;
