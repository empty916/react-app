// 这是自动生成的文件，可以修改。

import React, { Component } from 'react';
import inject from '@inject';
import { Tabs } from '@component';
import PaCard from 'Card';
// import Moment from 'moment'; // 设置时间选择器默认时间new Moment('2019-01-01')
import PaTable from 'PaTable';

import style from './style.scss';

const { TabPane } = Tabs;
const columns = [
	{
		title: '序号',
		dataIndex: 'serial',
		key: 'serial',
	},
	{
		title: '待办事项',
		dataIndex: 'message',
		key: 'message',
	},
	{
		title: '时间',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render: status => (status === 0 ? '待审核' : '未审核'),
	},
	{
		title: '操作',
		key: 'operate',
		render: rowDate => {
			let content = '';
			// console.log(rowDate.status);
			// console.log(rowDate.bizType);
			switch (rowDate.status) {
				case 0:
					content = (
						<span>
							<a href="./">审核</a>
							<a href="./">详情</a>
						</span>
					);
					break;
				case 1:
					content = <a href="./">详情</a>;
					break;
				default:
					break;
			}
			return content;
		},
	},
];
@inject('template')

class Template extends Component {
	componentDidMount() {
		this.getActions().getList();
	}

	componentWillUnmount() {}
	getActions = () => this.props.templateActions;
	getStore = () => this.props.templateStore;
	changePage = (pageNum, pageSize) => {
		const params = {};
		params.pageNum = pageNum;
		params.pageSize = pageSize;
		this.getActions().getList(params).then(() => this.getActions().updatePage(params));
		// console.log(obj);
	};
	ShowSizeChange = (pageNum, pageSize) => {
		const params = {};
		params.pageNum = pageNum;
		params.pageSize = pageSize;
		this.getActions().getList(params).then(() => this.getActions().updatePage(params));
	};
	// tab切换的回调
	changeTab = activeKey => {
		// console.log(activeKey);
		switch (activeKey) {
			case '1':
				this.getActions().updateData({ status: '' });
				this.getActions().getList();
				break;
			case '2':
				// console.log(activeKey);
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
	render() {
		const { tableList, page } = this.getStore();
		return (
			<PaCard className={style.template}>
				<Tabs defaultActiveKey="1" onChange={activeKey => this.changeTab(activeKey)}>
					<TabPane tab="全部" key="1" />
					<TabPane tab="待处理" key="2" />
					<TabPane tab="已处理" key="3" />
				</Tabs>
				<PaTable
					rowKey="id"
					dataSource={tableList}
					columns={columns}
					className={style.table}
					onChange={this.changePage}
					onShowSizeChange={this.ShowSizeChange}
					page={page}
				/>
			</PaCard>
		);
	}
}

export default Template;
