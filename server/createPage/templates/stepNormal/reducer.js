// 这是自动生成的文件，可以修改。
import { createInputFactory as CIF } from 'DynamicForm';
import { pledgeTransferMode, factoringMode, searchWay } from '@client/common/data';
import { objToOptions } from '@utils';
import { createChangeMode } from '@client/utils';
import * as types from './constants';

const pledgeTransferModeOption = objToOptions(pledgeTransferMode, true);
const factoringModeOption = objToOptions(factoringMode, true);
const searchWayOption = objToOptions(searchWay, true);

const layoutCIF = label =>
	CIF(label).prop({style: {width: 280}}).layout({
		lg: 12, // 适应屏幕设置
		md: 24,
		xs: 24,
		sm: 24,
	}).ph();

const requiredLayoutCIF = label => layoutCIF(label).isRequired(); // 为input->ph->必填项
// const disabledLayoutCIF = label => requiredLayoutCIF(label).isDisable(); // 为input->ph->必填项->失效
const initialState = {
	fieldsConfig: { // 融资申请 -> label
		financingRate: requiredLayoutCIF('融资比例'),
		pledgeTransferMode: layoutCIF('质押/转让方式').isSelect(pledgeTransferModeOption),
		factoringMode: layoutCIF('明/暗保理').isSelect(factoringModeOption),
		searchWay: layoutCIF('追索方式').isSelect(searchWayOption),
		isFinancing: layoutCIF('是否融资').isSelect([
			{
				value: '',
				text: '请选择',
			}, {
				value: '1',
				text: '是',
			}, {
				value: '0',
				text: '否',
			},
		]),
	},
	formFields: {
		financingRate: '',
		pledgeTransferMode: '',
		factoringMode: '',
		searchWay: '',
		isFinancing: '',
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
