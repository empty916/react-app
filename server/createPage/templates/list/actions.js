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


const getData = params => dispatch => {
	dispatch(updateData(params));
};

const resetForm = () => ({
	type: type.RESET_FORM,
});


const resetPage = () => ({
	type: type.RESET_PAGE,
});


const getList = () => (dispatch, src) => {
	const { formFields, page } = getState(src);
	service.getList({ ...formFields, ...page }).then(res =>
		dispatch(updateData({
			list: res.data.list,
		})));
};

export {
	updateData,
	updateFormField,
	updateFormConfig,
	resetForm,
	getData,
	getList,
	resetPage,
};
