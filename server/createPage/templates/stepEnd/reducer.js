// 这是自动生成的文件，可以修改。
import { createInputFactory as _CIF } from 'DynamicForm';
import {
	breakContractType,
	breakContractTriggerScene,
	breakContractTriggerType,
	getAgreementSendText,
	agreementTextReciever,
} from '@client/common/data';
import { objToOptions } from '@utils';
import { createChangeMode } from '@client/utils';
import * as types from './constants';

const breakContractTypeOptions = objToOptions(breakContractType);
const breakContractTriggerSceneOptions = objToOptions(breakContractTriggerScene, true);
const breakContractTriggerTypeOptions = objToOptions(breakContractTriggerType, true);
const getAgreementSendTextOptions = objToOptions(getAgreementSendText);
const agreementTextRecieverOptions = objToOptions(agreementTextReciever, true);
const CIF = label => _CIF(label).prop({style: {width: 280}, size: 'large'}).ph();
const layoutCIF = label =>
	CIF(label).layout({
		xxl: 12,
		xl: 12,
		lg: 12, // 适应屏幕设置
		md: 24,
		xs: 24,
		sm: 24,
	});
const aRowLayoutCIF = label =>
	CIF(label).layout({
		xxl: 13,
		xl: 13,
		lg: 13,
		md: 24,
		xs: 24,
		sm: 24,
	});
const initialState = {
	fieldsConfig: { // 融资申请 -> label
		dfltTpCd: aRowLayoutCIF('违约类型').isCheckbox(breakContractTypeOptions),
		dfltTrgrScnCd: layoutCIF('违约触发场景').isSelect(breakContractTriggerSceneOptions),
		dfltPcsgMtdCd: layoutCIF('违约触发方式').isSelect(breakContractTriggerTypeOptions),
		agrmTx: aRowLayoutCIF('获取发送协议文本').isCheckbox(getAgreementSendTextOptions),
		txRcPty: aRowLayoutCIF('获取文本接收方').isSelect(agreementTextRecieverOptions),
	},
	formFields: {
		dfltTpCd: [],
		dfltTrgrScnCd: '',
		dfltPcsgMtdCd: '',
		agrmTx: [],
		txRcPty: '',
	},
	hasSaved: false,
};

const changeMode = createChangeMode(initialState.fieldsConfig, CIF, 'detail');

const productManagementAddStepBreakContractParams = (state = initialState, {type, data}) => {
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
		case types.GET_DETAIL_DATA:
			return {
				...state,
				formFields: {
					...state.formFields,
					...data,
					dfltTpCd: data.dfltTpCd ? data.dfltTpCd.split(',') : [],
					agrmTx: data.agrmTx ? data.agrmTx.split(',') : [],
				},
			};
		default:
			return state;
	}
};

export default productManagementAddStepBreakContractParams;
