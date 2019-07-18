// 这是自动生成的文件，可以修改。
import { createInputFactory as CIF } from 'DynamicForm';

import * as types from './constants';

const layoutCIF = label =>
	CIF(label).prop({style: {width: 280, height: 40}});
const initialState = () => ({
	formFields: {
		estb: undefined,
		deadline: null,
	},
	fieldsConfig: {
		estb: layoutCIF('开立方').isSelect([
			{
				text: '广州天翼',
				value: '000daf8e9u8u8weur9wu9rw9ur9uw9u8',
			},
			{
				text: '上海电信',
				value: '000daf8e9u8u8weur9wu9rw9ur9uw9u81234',
			},
		]).ph('请选择'),
		deadline: layoutCIF('到期日').isDatePicker().ph('请选择'),
	},
	page: {
		pageNum: 1, // 表格当前页
		pageSize: 2, // 一页显示多少条数据
		total: 0,
	},
	opin: '', // 拒签原因
	tableList: [],
	operate: ['签收', '拒签', '查看'],
	status: '',
	textvalue: '',
});

const { formFields } = initialState();

const Template = (state = initialState(), {type, data}) => {
	switch (type) {
		case types.UPDATE_DATA:
			/**
			 * 这里返回一定要返回一个新的对象，而不能在原来的state基础上做修改
			 * 正确的是
			 * return { ...state }
			 * 错误的是
			 * state.data = xxx;
			 * return state;
			 *
			 * 要达到newState !== oldState的效果
			 * 视图的数据才会随着更改而更新，否则视图层不会更新
			 */
			return {
				...state,
				...data,
			};
		case types.UPDATE_FORM:
			return {
				...state,
				formFields: {
					...state.formFields,
					...data, // params: params
				},
			};
		case types.RESET_FORM:
			return {
				...state,
				formFields,
			};
		case types.UPDATE_PAGE:
			return {
				...state,
				page: {
					...state.page,
					...data,
				},
			};
		default:
			return state;
	}
};


export default Template;
