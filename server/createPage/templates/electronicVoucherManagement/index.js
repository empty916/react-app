// 这是自动生成的文件，可以修改。

import React, { Component } from 'react';
import inject from '@inject';
import { Tabs } from '@component';
import { Input } from 'antd';
import Button from 'Button';
import PaCard from 'Card';
// import Moment from 'moment'; // 设置时间选择器默认时间new Moment('2019-01-01')
import PaTable from 'PaTable';
import Modal from 'Modal';
import Moment from 'moment';
// import curry from 'lodash/fp/curry';

import { dateFormat } from '@client/common/data';

import DynamicForm from 'DynamicForm';
import style from './style.scss';

const { TextArea } = Input;
const { TabPane } = Tabs;
const columns1 = (sign, refuse) => [
	{
		title: '企业金条编号',
		dataIndex: 'eleNum',
		key: 'eleNum',
	},
	{
		title: '企业金条金额',
		dataIndex: 'eleAmount',
		key: 'eleAmount',
	},
	{
		title: '企业金条可流转余额',
		dataIndex: 'eleFlowAmount',
		key: 'eleFlowAmount',
	},
	{
		title: '签发方',
		dataIndex: 'issuer',
		key: 'issuer',
	},
	{
		title: '签发日期',
		dataIndex: 'issueDate',
		key: 'issueDate',
	},
	{
		title: '兑付日期',
		dataIndex: 'demptionDate',
		key: 'demptionDate',
	},
	{
		title: '企业金条状态',
		dataIndex: 'eleStatus',
		key: 'eleStatus',
		// render: eleStatus => {

		// }
	},
	{
		title: '操作',
		key: 'operate',
		render: rowDate => {
			let content = '';
			switch (rowDate.eleStatus) {
				case 'T01':
					if (rowDate.auditStatus === 'A01') {
						content = (
							<span>
								<span onClick={() => sign(rowDate.eleNum)}>
									签收
								</span>
								<span onClick={() => refuse(rowDate.eleNum)}>
									拒签
								</span>
								<a href="./">查看</a>
							</span>
						);
					} else {
						content = (
							<span>
								<a href="./">查看</a>
							</span>
						);
					}
					break;
				case 'T02':
					content = (
						<span>
							<a href="./">查看</a>
						</span>
					);
					break;
				case 'T03':
					content = (
						<span>
							<a href="./">支付</a>
							<a href="./">发起融资</a>
							<a href="./">查看</a>
						</span>
					);
					break;
				case 'T04':
					content = (
						<span>
							<a href="./">查看</a>
						</span>
					);
					break;
				default:
					break;
			}
			return content;
		},
	},
];

const modalTitleMap = {
	sign: '签收企业金条',
	refuse: '拒签企业金条',
};
const hastext = {
	sign: false,
	refuse: true,
};
@inject('template')
class Template extends Component {
	state = {
		visible: false,
		signType: '',
		target: '',
	};
	componentDidMount() {
		this.getActions().getList();
	}
	componentWillUnmount() {}
	// 更新表单的值
	onChange = ({ name, value }) => {
		const params = {};
		if (Moment.isMoment(value)) {
			value = value.format(dateFormat);
		}
		params[name] = value;
		this.getActions().updateForm(params);
	};
	getActions = () => this.props.templateActions;
	getStore = () => this.props.templateStore;
	changePage = (pageNum, pageSize) => {
		const params = {};
		params.pageNum = pageNum;
		params.pageSize = pageSize;
		this.getActions()
			.getList(params)
			.then(() => this.getActions().updatePage(params));
	};
	ShowSizeChange = (pageNum, pageSize) => {
		const params = {};
		params.current = pageNum;
		params.pageSize = pageSize;
		this.getActions().updatePage(params);
		this.getActions().getList();
	};
	// 表单重置
	resetForm = () => {
		this.getActions().resetForm();
		this.dynamicForm.resetFields(); // 重置表单
	};
	// 支付
	pay = () => {};
	// 发起融资
	initiateFinance = () => {};

	// tab切换的回调
	changeTab = activeKey => {
		// console.log(activeKey);
		switch (activeKey) {
			case '1':
				this.getActions().updateData({ status: '' });
				this.getActions().getList();
				break;
			case '2':
				this.getActions().updateData({ status: '0' });
				this.getActions().getList();
				break;
			case '3':
				this.getActions().updateData({ status: '1' });
				this.getActions().getList();
				break;
			default:
				break;
		}
	};
	handleCancel = () => {
		this.setState({ visible: false });
	};
	// 签署或者拒签
	sign = (params, type) => {
		this.getActions()[type]({ gldId: params })
			.then(() => new Promise(resolve => this.setState({ visible: false }, () => resolve())))
			.then(this.getActions().getList);
	};
	handleOk = () => {
		const { signType, target } = this.state;
		this.sign(target, signType);
	};
	showModal = type => params => {
		this.setState({
			visible: true,
			signType: type,
			target: params,
		});
	};
	valueChange = e => {
		this.getActions().updateData({textvalue: e.target.value});
	}
	render() {
		// showModal(type)(params)
		const { tableList, formFields, fieldsConfig, page, textvalue } = this.getStore();
		const { signType } = this.state;
		return (
			<PaCard className={style.template}>
				<Tabs
					defaultActiveKey="1"
					onChange={activeKey => this.changeTab(activeKey)}
				>
					<TabPane tab="全部" key="1">
						<DynamicForm
							ref={node => (this.dynamicForm = node)}
							className={style.item} // 样式
							layout={DynamicForm.LAYOUT.INLINE} // 表单布局：水平
							// formItemLayout={{ span: 8 }} // 表单元素布局
							formFields={formFields} // 表单属性
							fieldsConfig={fieldsConfig} // 表单配置
							onChange={this.onChange} // 表单元素改变回调 参数arg
						>
							<Button
								ref={ref => (this.bubbles = ref)}
								type="primary"
								onClick={this.query}
							>
								查询
							</Button>
							&nbsp;&nbsp;
							<Button>重置</Button>
						</DynamicForm>
					</TabPane>
					<TabPane tab="未签收(23)" key="2">
						<DynamicForm
							className={style.item} // 样式
							layout={DynamicForm.LAYOUT.INLINE} // 表单布局：水平
							// formItemLayout={{ span: 8 }} // 表单元素布局
							formFields={formFields} // 表单属性
							fieldsConfig={fieldsConfig} // 表单配置
							onChange={this.onChange} // 表单元素改变回调 参数arg
						>
							<Button
								ref={ref => (this.bubbles = ref)}
								type="primary"
								onClick={this.butClick}
							>
								查询
							</Button>
							&nbsp;&nbsp;
							<Button onClick={this.reset}>重置</Button>
						</DynamicForm>
					</TabPane>
					<TabPane tab="已签收" key="3">
						<DynamicForm
							className={style['item-received']} // 样式
							layout={DynamicForm.LAYOUT.INLINE} // 表单布局：水平
							// formItemLayout={{ span: 8 }} // 表单元素布局
							formFields={formFields} // 表单属性
							fieldsConfig={fieldsConfig} // 表单配置
							onChange={this.onChange} // 表单元素改变回调 参数arg
						>
							<Button
								ref={ref => (this.bubbles = ref)}
								type="primary"
								onClick={this.getActions().getList}
							>
								查询
							</Button>
							&nbsp;&nbsp;
							<Button onClick={this.resetForm}>重置</Button>
						</DynamicForm>
						<div className={style.btn}>
							<Button onClick={() => this.pay()}>支付</Button>
							&nbsp;&nbsp;
							<Button onClick={() => this.initiateFinance()}>
								发起融资
							</Button>
						</div>
					</TabPane>
				</Tabs>
				<PaTable
					rowKey="id"
					dataSource={tableList}
					columns={columns1(
						this.showModal('sign'),
						this.showModal('refuse'),
					)}
					className={style.table}
					onChange={this.changePage}
					onShowSizeChange={this.ShowSizeChange}
					page={page}
				/>
				<Modal
					cancelText="取消"
					okText="确定"
					title={modalTitleMap[signType]}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{hastext[signType] && (
						<TextArea
							className={style['modal-text']}
							name="reviewOption"
							id="review"
							cols="30"
							rows="10"
							placeholder="审核意见（可选）"
							onChange={this.valueChange}
							value={textvalue}
						/>
					)}
				</Modal>
			</PaCard>
		);
	}
}

export default Template;
