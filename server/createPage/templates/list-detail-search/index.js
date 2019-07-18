// 这是自动生成的文件，可以修改。

import React, { Component } from 'react';
import inject from '@inject';
import DynamicForm from 'DynamicForm';
import Button from 'Button';
import PaTable from 'PaTable';
import Moment from 'moment';
import { Icon } from 'antd';
import { dateFormat } from '@client/common/data';
import style from './style.scss';

const columns = [
	{
		title: '企业金条编号',
		dataIndex: 'eleCertificateNum',
		key: '企业金条编号',
	},
	{
		title: '企业金条金额(元)',
		dataIndex: 'eleCertificateAmount',
		key: '企业金条金额(元)',
	},
	{
		title: '已付款金额(元)',
		dataIndex: 'amountPaied',
		key: '已付款金额(元)',
	},
	{
		title: '接收方',
		dataIndex: 'receiver',
		key: '接收方',
	},
	{
		title: '签发日期',
		dataIndex: 'issueDate',
		key: '签发日期',
	},
	{
		title: '兑付日期',
		dataIndex: 'payDate',
		key: '兑付日期',
	},
	{
		title: '审批意见',
		dataIndex: 'approvalOpinion',
		key: '审批意见',
	},
	{
		title: '操作',
		key: '操作',
		render: () => <a herf='./'>查看</a>,
	},
];

@inject('template')
class Template extends Component {
	componentDidMount() {
		this.getActions().getList();
	}
	componentWillUnmount() {}
	onChange = ({name, value}) => {
		const formFields = {
			[name]: value,
		};
		if (Moment.isMoment(value)) {
			formFields[name] = value.format(dateFormat);
		}
		this.getActions().updateFormField(formFields);
	}
	getActions = () => this.props.templateActions;
	getStore = () => this.props.templateStore;
	resetForm = () => {
		this.getActions().resetForm();
		this.dynamicForm.resetFields();
	}
	render() {
		const { formFields, fieldsConfig, list, isDetailSearch } = this.getStore();
		return (
			<div className={style.template} >
				<DynamicForm
					wrappedComponentRef={node => this.dynamicForm = node}
					formFields={formFields}
					fieldsConfig={fieldsConfig}
					onChange={this.onChange}
					layout={DynamicForm.LAYOUT.INLINE}
				>
					<Button type="primary" className={style['mt-10']} onClick={this.getActions().getList}>查询</Button>&nbsp;&nbsp;
					<Button className={style['mt-3']} onClick={this.resetForm}>重置</Button>
					&nbsp;&nbsp;
					<span onClick={this.getActions().toggleDetailSearch} className={style['main-theme-color']}>
						高级搜索
						{ isDetailSearch ? <Icon type='up' /> : <Icon type='down' />}
					</span>
				</DynamicForm>
				<br />
				<Button>录入应收账款</Button>
				<br /><br />
				<PaTable
					rowKey='eleCertificateNum'
					scroll={{ x: 1300 }}
					columns={columns}
					dataSource={list}
					totals={1}
				/>
			</div>
		);
	}
}

export default Template;
