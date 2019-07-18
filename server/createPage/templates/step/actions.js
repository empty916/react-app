// 这是自动生成的文件，可以修改。
import { templateServer } from '@client/service';
import * as type from './constants';

const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});

const changeMode = data => ({
	type: type.CHANGE_MODE,
	data,
});

// const getData = params => dispatch => {
// 	dispatch(updateData(params));
// };

const getData = () => dispatch => templateServer
	.getData()
	.then(res => {
		const { data } = res.data;
		dispatch(updateData({data}));
	});

export {
	updateData,
	getData,
	// financingApplicationInputList,
	changeMode,
};
