// 这是自动生成的文件，可以修改。
import * as type from './constants';

const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});

const getData = params => dispatch => {
	dispatch(updateData(params));
};

export {
	updateData,
	getData,
};
