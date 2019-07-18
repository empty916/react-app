// 这是自动生成的文件，可以修改。
import { template as service } from '@client/service';
import { message } from 'antd';
import * as type from './constants';

// const getState = src => src().root.templateStore;

function commonCatch() {
	return this.catch(e => {
		if (e && e.data && e.data.responseMessage) {
			message.error(e.data.responseMessage);
		}
	});
}

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

const getData = params => dispatch => service
	.getProductDetail(params)
	.then(res => {
		const { data } = res.data;
		dispatch(getDetailData(data.bscInfoVO));
		return Promise.resolve(data);
	})::commonCatch();

const saveBaseInfo = params => dispatch =>
	service.saveBaseInfo(params)
		.then(res => {
			dispatch(updateForm({
				...res.data.data,
			}));
			dispatch(updateData({
				hasSaved: true,
			}));
			message.success('保存成功！');
			return Promise.resolve();
		})::commonCatch();

export {
	updateData,
	getData,
	getDetailData,
	// financingApplicationInputList,
	changeMode,
	updateForm,
	saveBaseInfo,
};
