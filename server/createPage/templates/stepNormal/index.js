// 这是自动生成的文件，可以修改。

import React, {Component} from 'react';
import inject from '@inject';
import Button from 'Button';
import DynamicForm from 'DynamicForm';
import Moment from 'moment';
import { message } from 'antd';
import { dateFormat } from '@client/common/data';
import style from './style.scss';

@inject('template')
class Template extends Component {
	componentWillMount() {}
	componentDidMount() {
		const { changeMode } = this.getAction();
		changeMode(this.props.types);
	}
	onChanges = ({name, value}) => {
		this.hasChanged = true;
		const params = {
			[name]: value,
		};
		if (Moment.isMoment(value)) {
			params[name] = value.format(dateFormat);
		}
		this.getAction().updateForm(params);
	};
	getAction = () => this.props.templateActions;
	getStore = () => this.props.templateStore;
	getData = () => {
		const { getData } = this.getAction();
		return getData();
	}
	isShowButton = (next, previous, types) => {
		if (types === 'detail') {
			return null;
		}
		return (
			<div className={style.itemBut}>
				<Button onClick={previous}>上一步</Button>&nbsp;&nbsp;
				<Button onClick={this.save}>保存</Button>
				<Button type="primary" onClick={this.next}>下一步</Button>
			</div>
		);
	}
	next = () => {
		const { next } = this.props;
		const { hasSaved } = this.getStore();
		if (!hasSaved || this.hasChanged) {
			this.save().then(next);
		} else {
			next();
		}
	}
	save = () => new Promise(this.dynamicForm.validateFieldsAndScroll)
		.then(err => {
			if (!err) {
				const { formFields: {pdId} } = this.props.templateStore;
				const { formFields } = this.getStore();
				if (!pdId) {
					return message.warn('请先保存产品基本信息！');
				}
				return this.getAction().saveProductParams({
					pdId,
					...formFields,
				})
					.then(() => {
						this.hasChanged = false;
						return Promise.resolve();
					});
			}
			return Promise.reject();
		});
	render() {
		const { fieldsConfig, formFields } = this.getStore(); // mock数据
		const { next, previous, types } = this.props;
		return (
			<div className={style.template}>
				<div>
					<DynamicForm
						layout={DynamicForm.LAYOUT.HORIZONTAL} // 表单布局：水平
						formFields={formFields}
						wrappedComponentRef={node => this.dynamicForm = node}
						fieldsConfig={fieldsConfig}
						formItemLayout={{ span: 12 }}
						className={style.formDetail}
						onChange={this.onChanges} // 表单元素改变回调 参数arg
					/>
					{ this.isShowButton(next, previous, types) }
				</div>
			</div>
		);
	}
}

export default Template;
