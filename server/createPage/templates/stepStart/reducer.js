// 这是自动生成的文件，可以修改。
import { createInputFactory as _CIF } from 'DynamicForm';
import { createChangeMode } from '@client/utils';
import * as types from './constants';

const CIF = label => _CIF(label).prop({style: {width: 280}}).ph();
const layoutCIF = label =>
	CIF(label).layout({
		xxl: 12,
		xl: 12,
		lg: 12, // 适应屏幕设置
		md: 24,
		xs: 24,
		sm: 24,
	});
const requiredLayoutCIF = label => layoutCIF(label).isRequired(); // 为input->ph->必填项
const disabledLayoutCIF = label => layoutCIF(label).isDisable(); // 为input->ph->必填项->失效
const initialState = {
	fieldsConfig: { // 融资申请 -> label
		pdId: disabledLayoutCIF('产品编号').isDisable().ph(''),
		pdNm: requiredLayoutCIF('产品名称'),
		pdTp: disabledLayoutCIF('产品类型').isSelect([{value: '1', text: '企业金条'}]),
		efDat: requiredLayoutCIF('产品生效日').isDatePicker(),
		exDat: requiredLayoutCIF('产品到期日').isDatePicker(),
		pdCmnt: CIF('产品说明').isTextArea().layout({
			xxl: 13,
			xl: 13,
			lg: 13, // 适应屏幕设置
			md: 24,
			xs: 24,
			sm: 24,
			// span: 24,
		}).itemProp({
			labelCol: {
				sm: 4,
				xs: 24,
			},
			wrapperCol: {
				sm: 20,
				xs: 24,
			},
		})
			.prop({style: {width: '700px'}}),
	},
	formFields: {
		type: 'add',
		pdId: '',
		pdNm: '',
		pdTp: '1', // 默认产品类型：企业金条
		efDat: null,
		exDat: null,
		pdCmnt: '',
	},
	hasSaved: false,
};

const changeMode = createChangeMode(initialState.fieldsConfig, CIF, 'detail');

const template = (state = initialState, {type, data}) => {
	switch (type) {
		case types.UPDATE_DATA:
			return {
				...state,
				...data,
			};
		case types.CHANGE_MODE:
			return changeMode(state, data);
		case types.UPDATE_FORM:
			return {
				...state,
				formFields: {
					...state.formFields,
					...data,
				},
			};
		default:
			return state;
	}
};


export default template;
