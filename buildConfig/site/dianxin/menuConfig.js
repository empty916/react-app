import React from 'react';
import { Icon } from 'antd';

// { //一级菜单demo
//     key: '01', 唯一标记
//     icon: 'apple',图标
//     text: 'app',文案
//     auth: 'ap2',权限名称
//     authLevel: 20,权限等级
//     link: {跳转路径
//             pathname: 'cangku',
//             query: {
//                 id: 1,
//             }
//     },
//     disabled: false,
// },
// {    二级菜单demo
//     key: 'sub1',
//     title: <span><Icon type="user"/><span>User</span></span>,
//     children: [
//          {   //子菜单数组
//         key: 'sub1-1',
//         text: 'Tttt',
//         link: {
//             pathname: 'tttt',
//             query: {
//                 id: 'Tom',
//             }
//         },
//     },
//          {
//         key: 'sub1-2',
//         text: 'Bill',
//         link: {
//             pathname: 'result',
//             query: {
//                 id: 'Bill',
//             }
//         },
//     }, {
//         key: 'sub1-3',
//         text: 'Alex',
//         link: {
//             pathname: 'result',
//             query: {
//                 id: 'Alex',
//             }
//         },
//     },]
//     },

export default [
	{
		key: '账户概览',
		text: '账户概览',
		icon: 'user',
		auth: 'accuont/overview',
		link: '/accountOverview',
	},
	{
		key: '消息管理',
		text: '消息管理',
		icon: 'xiaoxiguanli',
		auth: 'message/manage',
		link: '/messageManagement',
	},
	{
		key: '待办事项',
		text: '待办事项',
		icon: 'daibanshixiang',
		auth: 'todo',
		link: '/backlogItem',
	},
	{
		key: '应付账款管理',
		text: '应付账款管理',
		icon: 'yingfuzhangkuan',
		auth: 'accountsPayable/manage',
		link: '/accountsPayableManagement',
	},
	{
		key: '企业金条管理/融资方',
		auth: 'eleCertificate/manage/lender',
		text: '企业金条管理',
		icon: 'dianzipingzhengguanli',
		link: '/eleCertificate/lender/list',
	},
	{
		key: '企业金条管理/核心企业',
		auth: 'eleCertificate/manage/coreCompany',
		title: (
			<span>
				<Icon type="dianzipingzhengguanli" />
				<span>企业金条管理</span>
			</span>
		),
		children: [
			{ // 子菜单数组
				key: '签发企业金条',
				text: '签发企业金条',
				link: {
					pathname: 'financing',
					query: {
						type: 'eleCertificate',
					},
				},
			},
			{ // 子菜单数组
				key: '企业金条台账',
				text: '企业金条台账',
				link: {
					pathname: 'eleCertificate/coreCompany/standBook/list',
				},
			},
		],
	},
	{
		key: '企业金条兑付管理',
		text: '企业金条兑付管理',
		icon: 'dianzipingzhengguanli',
		auth: 'eleCertificate/coreCompany/pay/list',
		link: 'eleCertificate/coreCompany/eleCash',
	},
	{
		key: '产品管理',
		text: '产品管理',
		icon: 'chanpinguanli',
		auth: 'product/manage',
		link: 'productManagement/list',
	},
	{
		key: '产业链管理',
		text: '产业链管理',
		icon: 'chanyelianguanli',
		auth: 'industryChain/manage',
		link: 'productChainManagement/list',
	},
	{
		key: '方案管理',
		text: '方案管理',
		icon: 'fanganguanli',
		auth: 'program/manage',
		link: 'projectManagement/list',
	},
	// {
	// 	key: '基础管理',
	// 	title: (
	// 		<span>
	// 			<Icon type="apple" />
	// 			<span>基础管理</span>
	// 		</span>
	// 	),
	// 	// auth: '',
	// 	children: [
	// 		{
	// 			key: '首页',
	// 			text: '首页',
	// 			// auth: '',
	// 			link: 'home',
	// 		},
	// 		{
	// 			key: '首页2',
	// 			text: '首页2',
	// 			// auth: '',
	// 			link: 'home',
	// 		},
	// 	],
	// },
	{
		key: '额度管理',
		text: '额度管理',
		icon: 'eduguanli',
		auth: 'account/manage',
		link: '/creditManagement',
	},
	{
		key: '客户管理',
		text: '客户管理',
		icon: 'kehuguanli',
		auth: 'customer/manage',
		link: '/customerMangement',
	},
	{
		key: '融资管理',
		text: '融资管理',
		icon: 'rongziguanli',
		auth: 'financing/manage',
		link: '/financingManagement',
	},
	{
		key: '融资受理管理',
		text: '融资受理管理',
		icon: 'rongzishouliguanli',
		auth: 'financeAccept/manage',
		link: '/financingAcceptManage',
	},
	{
		key: '综合查询',
		text: '综合查询',
		icon: 'zonghechaxun',
		auth: 'integratedQuery',
		link: 'integratedQuery',
	},
];
