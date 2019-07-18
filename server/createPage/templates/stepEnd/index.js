// 这是自动生成的文件，可以修改。

import React, {Component} from 'react';
import inject from '@inject';
import Button from 'Button';
import DynamicForm from 'DynamicForm';
import Moment from 'moment';
import { history } from '@react-router';
import { dateFormat } from '@client/common/data';
import { formatFormFields } from '@client/utils';
import style from './style.scss';

@inject('template', 'templateBaseInfo')
class Template extends Component {
	componentDidMount() {
		const { changeMode } = this.getAction();
		changeMode(this.props.types);
	}
	componentDidUpdate() {
	}
	componentWillUnmount() {
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
	getData = params => this.getAction().getData(params);
	createParams = () => {
		const searchType = {
			actionType: 'add',
		};
		const formType = {
			type: 'add',
		};
		switch (this.props.type) {
			case 'detail':
				formType.type = 'view';
				searchType.actionType = 'view';
				break;
			case 'update':
				formType.type = 'edit';
				searchType.actionType = 'edit';
				break;
			default:
				formType.type = 'add';
				searchType.actionType = 'add';
				break;
		}
		this.getAction().updateForm(formType);
		return searchType;
	}
	isShowButton = (next, previous, types) => {
		if (types === 'detail') {
			return null;
		}
		return (
			<div className={style.itemBut}>
				<Button onClick={previous}>上一步</Button>&nbsp;&nbsp;
				<Button onClick={this.save}>保存</Button>
				<Button type="primary" className={style.butClass} onClick={this.submit}>提交</Button>
			</div>
		);
	}
	save = () => new Promise(this.dynamicForm.validateFieldsAndScroll)
		.then(err => {
			if (!err) {
				const { formFields: {pdId} } = this.props.templateStore;
				return this.getAction().save({pdId})
					.then(() => {
						const { formFields } = this.getStore();
						this.dynamicForm.setFields(formFields);
						this.hasChanged = false;
						return Promise.resolve();
					});
			}
			return Promise.reject();
		});
	submit = () => {
		const { formFields: {id} } = this.props.templateStore;
		const { hasSaved } = this.getStore();
		const submitAction = () => this.getAction().submit({id}).then(() => history.push('/list'));
		if (!hasSaved || this.hasChanged) {
			this.save().then(submitAction);
		} else {
			submitAction();
		}
	}
	render() {
		const { fieldsConfig, formFields } = this.getStore(); // mock数据
		const { next, previous, types } = this.props;
		return (
			<div className={style.productManagementAddStepBreakContractParams}>
				<div>
					<DynamicForm
						wrappedComponentRef={node => this.dynamicForm = node}
						layout={DynamicForm.LAYOUT.HORIZONTAL} // 表单布局：水平
						formFields={formatFormFields(formFields)}
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
