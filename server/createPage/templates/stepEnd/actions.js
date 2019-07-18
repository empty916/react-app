// 这是自动生成的文件，可以修改。
import { template as service } from '@client/service';
import { message } from 'antd';
import * as type from './constants';

const getState = src => src().root.templateStore;


function commonCatch() {
	return this.catch(e => {
		if (e && e.data && e.data.responseMessage) {
			message.error(e.data.responseMessage);
		}
	});
}

// function createThen(tips = '操作成功！') {
// 	return this.then(() => {
// 		message.success(tips);
// 		return Promise.resolve();
// 	});
// }

const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});

const changeMode = data => ({
	type: type.CHANGE_MODE,
	data,
});

const updateForm = data => ({
	type: type.UPDATE_FORM,
	data,
});

const getDetailData = data => ({
	type: type.GET_DETAIL_DATA,
	data,
});

const getData = params => dispatch => service
	.getBaseInfo(params)
	.then(res => {
		const { data } = res.data;
		dispatch(updateData({data}));
	});

const save = params => (dispatch, src) => {
	const formFields = { ...getState(src).formFields };
	Object.keys(formFields)
		.filter(key => Array.isArray(formFields[key]))
		.forEach(key => formFields[key] = formFields[key].join(','));
	return service.add({
		...params,
		...formFields,
	})
		.then(() => {
			dispatch(updateData({
				hasSaved: true,
			}));
			message.success('保存成功！');
		})::commonCatch();
};

const submit = params => () => service.submit(params)
	.then(() => {
		message.success('提交成功！');
		return Promise.resolve();
	})::commonCatch();

export {
	updateData,
	getData,
	// financingApplicationInputList,
	changeMode,
	updateForm,
	save,
	submit,
	getDetailData,
};
