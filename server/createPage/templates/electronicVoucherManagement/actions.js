// 这是自动生成的文件，可以修改。
import { templateServer as service } from '@client/service';
import { message } from 'antd';
import * as type from './constants';
// import './mock';
// 获Store
const getState = src => src().root.templateStore;

const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});
const updateForm = data => ({
	type: type.UPDATE_FORM,
	data,
});
const resetForm = () => ({
	type: type.RESET_FORM,
});
const updatePage = data => ({
	type: type.UPDATE_PAGE,
	data,
});
const getData = params => dispatch => {
	dispatch(updateData(params));
};

const getList = param => (dispatch, src) => {
	const { formFields, status, page } = getState(src);
	let params = {
		...formFields,
		status,
		queryType: 'enp',
	};
	if (param) {
		params = { ...params, ...param };
	} else {
		params = { ...params, pageNum: page.pageNum, pageSize: page.pageSize };
	}
	return service
		.getList(params)
		.then(res => {
			// console.log(res);
			const { data } = res.data; // mock
			const { records } = data;
			// console.log(records);
			const tableList = records.map((item, index) => ({
				id: index,
				eleNum: item.gldId,
				eleAmount: item.gldAmt,
				eleFlowAmount: item.canPyAmt,
				issuer: item.estbName,
				issueDate: item.estbDay,
				demptionDate: item.exDay,
				eleStatus: item.tcPtyStatus, // 企业金条状态
				auditStatus: item.auditStatus, // 复核状态
				operate: null,
			}));
			dispatch(updateData({
				tableList,
				pageSize: data.size,
				pageNum: data.num,
			}));
			dispatch(updatePage({
				list: records,
				total: data.total,
			}));
		})
		.catch(res => res.responseMessage && message.error(res.responseMessage));
};
const sign = params => () =>
	service
		.sign(params)
		.catch(res => res.responseMessage && message.error(res.responseMessage));
const refuse = params => (dispatch, src) => {
	const { textvalue } = getState(src);
	const param = {
		textvalue,
		...params,
	};
	return service
		.refuse(param)
		.then(() => dispatch(updateData({textvalue: ''})))
		.catch(res => res.responseMessage && message.error(res.responseMessage));
};
export {
	updateData,
	updateForm,
	resetForm,
	updatePage,
	getData,
	getList,
	sign,
	refuse,
};
