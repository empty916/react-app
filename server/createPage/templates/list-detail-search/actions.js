// 这是自动生成的文件，可以修改。
import { template as service } from '@client/service';
import * as type from './constants';

const getState = src => src().root.templateStore;

const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});

const updateFormField = data => ({
	type: type.UPDATE_FORM_FIELD,
	data,
});

const updateFormConfig = data => ({
	type: type.UPDATE_FORM_CONFIG,
	data,
});

const toggleDetailSearch = () => ({
	type: type.DETAIL_SEARCH,
});

const getData = params => dispatch => {
	dispatch(updateData(params));
};

const resetForm = () => ({
	type: type.RESET_FORM,
});


const getList = () => (dispatch, src) => {
	const { formFields, page, isDetailSearch } = getState(src);
	const _formFields = { ...formFields };
	if (!isDetailSearch) {
		delete _formFields.issueDate;
		delete _formFields.payDate;
	}
	service.getList({ ..._formFields, ...page }).then(res =>
		dispatch(updateData({
			list: res.data.list,
		})));
};

export {
	updateData,
	updateFormField,
	updateFormConfig,
	getData,
	getList,
	resetForm,
	toggleDetailSearch,
};
