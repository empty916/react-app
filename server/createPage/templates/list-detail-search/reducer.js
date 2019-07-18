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
	},
	page: {
		total: 0,
		pageNum: 0,
		pageSize: 10,
	},
	fieldsConfig: {
	},
	list: [],
	isDetailSearch: false,
});

const { formFields, fieldsConfig } = initialState();

// 高级搜索的表单配置
const detailSearchForm = () => ({
	// issueDate: CIF('签发日期').isDatePicker(),
	// payDate: CIF('兑付日期').isDatePicker(),
});


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
				isDetailSearch: false,
			};
		case types.DETAIL_SEARCH:
			if (!state.isDetailSearch) {
				return {
					...state,
					fieldsConfig: {
						...state.fieldsConfig,
						...detailSearchForm(),
					},
					isDetailSearch: true,
				};
			}
			return {
				...state,
				isDetailSearch: false,
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
		default:
			return state;
	}
};


export default template;
