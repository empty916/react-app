// 这是自动生成的文件，可以修改。
import { createInputFactory as _CIF } from 'DynamicForm';
import * as types from './constants';

const CIF = label => _CIF(label).ph().prop({
	style: {
		width: 280,
	},
	size: 'large',
});

const initialState = () => ({
	formFields: {
		accountsPayable: '',
		partner: '',
		accountsPayableStatus: '',
	},
	page: {
		current: 0,
		total: 0,
		pageNum: 0,
		pageSize: 10,
	},
	fieldsConfig: {
		accountsPayable: CIF('应付账款'),
		partner: CIF('交易对手'),
		accountsPayableStatus: CIF('应付账款状态'),
	},
	list: [],
});

const { formFields, fieldsConfig, page } = initialState();

const template = (state = initialState(), {type, data}) => {
	switch (type) {
		case types.UPDATE_DATA:
			return {
				...state,
				...data,
			};
		case types.RESET_FORM:
			return {
				...state,
				formFields,
				fieldsConfig,
			};
		case types.UPDATE_FORM_FIELD:
			return {
				...state,
				formFields: {
					...state.formFields,
					...data,
				},
			};
		case types.UPDATE_FORM_CONFIG:
			return {
				...state,
				fieldsConfig: {
					...state.fieldsConfig,
					...data,
				},
			};
		case types.RESET_PAGE:
			return {
				...state,
				page: {...page},
			};
		default:
			return state;
	}
};


export default template;
