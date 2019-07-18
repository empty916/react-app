// 这是自动生成的文件，可以修改。
import { template as service } from '@client/service';
import { message } from 'antd';
import * as type from './constants';

// const getState = src => src().root.templateStore;

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

const getDetailData = updateForm;

const getData = () => dispatch => service
	.getData()
	.then(res => {
		const { data } = res.data;
		dispatch(updateData({data}));
	});


const saveProductParams = params => dispatch => service
	.saveProductParams(params)
	.then(() => {
		dispatch(updateData({
			hasSaved: true,
		}));
		message.success('保存成功！');
	})
	.catch(e => {
		if (e && e.data && e.data.responseMessage) {
			message.error(e.data.responseMessage);
		}
	});


export {
	updateData,
	getData,
	getDetailData,
	// financingApplicationInputList,
	changeMode,
	updateForm,
	saveProductParams,
};
