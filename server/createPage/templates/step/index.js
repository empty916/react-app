// 这是自动生成的文件，可以修改。

import React, {Component} from 'react';
import inject from '@inject';
import Button from 'Button';
import DynamicForm from 'DynamicForm';
import style from './style.scss';

@inject('template')
class Template extends Component {
	componentWillMount() {}
	componentDidMount() {
		const { changeMode } = this.getAction();
		changeMode(this.props.type);
		this.getData();
	}
	componentWillUnmount() {}

	onChanges = () => {};
	getAction = () => this.props.templateActions;
	getStore = () => this.props.templateStore;
	getData = () => {
		const { getData } = this.getAction();
		return getData();
	}
	isShowButton = (next, previous, type) => {
		if (type === 'detail') {
			return null;
		}
		return (
			<div className={style.itemBut}>
				<Button type="primary" className={style.butClass} onClick={next}>下一步</Button>
				<Button onClick={previous}>上一步</Button>
			</div>
		);
	}
	render() {
		const { fieldsConfig, formFields } = this.getStore(); // mock数据
		const { next, previous, type } = this.props;
		return (
			<div className={style.template}>
				<div>
					<DynamicForm
						layout={DynamicForm.LAYOUT.HORIZONTAL} // 表单布局：水平
						formFields={formFields}
						fieldsConfig={fieldsConfig}
						formItemLayout={{ span: 12 }}
						className={style.formDetail}
						onChange={this.onChanges} // 表单元素改变回调 参数arg
					/>
					{ this.isShowButton(next, previous, type) }
				</div>
			</div>
		);
	}
}

export default Template;
