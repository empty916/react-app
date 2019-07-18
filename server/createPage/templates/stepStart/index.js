// 这是自动生成的文件，可以修改。

import React, {Component} from 'react';
import inject from '@inject';
import Button from 'Button';
import { Link } from '@react-router';
import DynamicForm from 'DynamicForm';
import Moment from 'moment';
import { dateFormat } from '@client/common/data';
import { formatFormFields } from '@client/utils';
import style from './style.scss';

@inject('template')
class Template extends Component {
	componentDidMount() {
		const { changeMode } = this.getAction();
		changeMode(this.props.types);
		this.init();
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
	init = () => {
		const { id, types } = this.props;
		const typeMap = {
			detail: 'view',
			update: 'edit',
		};
		const formType = {
			type: typeMap[types] || 'add',
		};
		const params = {
			id,
		};
		if (typeMap[types]) {
			params.actionType = typeMap[types];
		}
		this.getAction().updateForm(formType);
		if (id) {
			const res = this.getAction().getData(params);
			return res;
		}
		return Promise.resolve();
	}
	isShowButton = (next, previous, types) => {
		if (types === 'detail') {
			return null;
		}
		return (
			<div className={style.itemBut}>
				<Button><Link to='/list/page'>取消</Link></Button>&nbsp;&nbsp;
				<Button onClick={this.save}>保存</Button>
				<Button type="primary" className={style.butClass} onClick={this.next}>下一步</Button>
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
				return this.getAction().saveBaseInfo(this.getStore().formFields)
					.then(() => {
						const { formFields } = this.getStore();
						this.dynamicForm.setFieldsValue(formatFormFields(formFields));
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
