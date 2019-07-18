// 这是自动生成的文件，可以修改。
import { createInputFactory as CIF } from 'DynamicForm';
import * as types from './constants';

const layoutCIF = label =>
	CIF(label).prop({style: {width: 280}}).layout({
		lg: 12, // 适应屏幕设置
		md: 24,
		xs: 24,
		sm: 24,
	}).ph();
const requiredLayoutCIF = label => layoutCIF(label).isRequired(); // 为input->ph->必填项
const disabledLayoutCIF = label => requiredLayoutCIF(label).isDisable(); // 为input->ph->必填项->失效
const initialState = {
	fieldsConfig: { // 融资申请 -> label
		maximumFinancingAmount: disabledLayoutCIF('最高可融资金额(元)').isDisable(),
		dateOfApplication: requiredLayoutCIF('申请日期').isDisable(),
		financingAmount: requiredLayoutCIF('融资金额(元)').isDisable(),
		repaymentStyle: requiredLayoutCIF('还款方式').isSelect([
			{
				text: '还款方式1-',
				value1: 'num1',
			},
			{
				text: '还款方式2-',
				value2: 'num2',
			},
			{
				text: '还款方式3-',
				value3: 'num3',
			},
		]),
		financingPeriod: requiredLayoutCIF('融资期限(天)').isDisable(),
		useOfFunds: requiredLayoutCIF('资金用途').isSelect([
			{
				text: '资金用途1-',
				value1: 'num1',
			},
			{
				text: '资金用途2-',
				value2: 'num2',
			},
			{
				text: '资金用途3-',
				value3: 'num3',
			},
		]),
		loanAccountType: requiredLayoutCIF('放款账户类型').isDisable(),
		loanAccount: requiredLayoutCIF('放款账号').isDisable(),
		loanAccountName: layoutCIF('放款账号名称').isDisable(),
		loanAccountBank: layoutCIF('放款账号开户行').isDisable(),
		financingRate: layoutCIF('融资费率(%)').isDisable(),
		interestRate: layoutCIF('预计利息汇率').isDisable(),
		amountOfArrivalTotal: layoutCIF('预计到账金额汇总').isDisable(),
		expectedExchangeRate: layoutCIF('预期利率(%)').isDisable(),
	},
	formFields: {
		maximumFinancingAmount: '',
		dateOfApplication: '',
		financingAmount: '',
		repaymentStyle: '',
		financingPeriod: '',
		useOfFunds: '',
		loanAccountType: '',
		loanAccount: '',
		loanAccountName: '',
		loanAccountBank: '',
		financingRate: '',
		interestRate: '',
		amountOfArrivalTotal: '',
		expectedExchangeRate: '',
	},
};

const createChangeMode = fieldsConfig => {
	let updateModeFieldConfigCache = { ...fieldsConfig };
	// 所有的表单元素其中有不是Text状态的
	const someFieldsIsNotTextStatus = newFieldsConfig => Object.keys(newFieldsConfig).some(key => newFieldsConfig[key].input.type !== 'Text');

	const resetCache = newCache => {
		if (someFieldsIsNotTextStatus(newCache)) {
			updateModeFieldConfigCache = { ...newCache };
		}
	};
	return (state, data) => {
		const newFieldConfig = {...state.fieldsConfig};
		if (data === 'detail') {
			resetCache(state.fieldsConfig);
			Object.keys(newFieldConfig)
				.filter(key => newFieldConfig[key].input.type !== 'Text')
				.forEach(key => newFieldConfig[key] = CIF(newFieldConfig[key]).isText().isNotRequired());
			return {
				...state,
				fieldsConfig: newFieldConfig,
			};
		}
		return {
			...state,
			fieldsConfig: updateModeFieldConfigCache,
		};
	};
};

const changeMode = createChangeMode(initialState.fieldsConfig);

const template = (state = initialState, {type, data}) => {
	switch (type) {
		case types.UPDATE_DATA:
			return {
				...state,
				...data,
			};
		case types.CHANGE_MODE:
			return changeMode(state, data);
		default:
			return state;
	}
};


export default template;
