// 这是自动生成的文件，可以修改。
import { templateService as service } from '@client/service';
import { Toast } from '@component';
import * as type from './constants';


const getState = src => src().root.templateStore;
const updateData = data => ({
	type: type.UPDATE_DATA,
	data,
});
const updatePage = data => ({
	type: type.UPDATE_PAGE,
	data,
});
const getData = params => dispatch => {
	dispatch(updateData(params));
};
// const getList = () => (dispatch, src) => {
// 	const { page } = getState(src);
// 	service.getList({ ...page }).then(res => {
// 		const tableList = res.data.data.list;
// 		const total = tableList.length;
// 		console.log(tableList);
// 		dispatch(updateData({
// 			tableList,
// 		}));
// 		dispatch(updatePage({
// 			total,
// 		}));
// 	});
// };
const getList = param => (dispatch, src) => {
	const { page, status } = getState(src);
	let params = { status };
	if (param) {
		params = { ...param };
	} else {
		params = { ...params, pageNum: page.pageNum, pageSize: page.pageSize };
	}
	return service.getList(params).then(res => {
		const { data } = res.data;
		const { records } = data;
		console.log(data.total);
		// console.log(data);
		// const total = tableList.length;
		// console.log(tableList);
		const tableList = records.map((item, index) => ({
			serial: index,
			message: item.todo,
			time: item.fomartTime,
			status: item.status,
			operate: ['详情'],
			bizType: item.bizType,
		}));
		dispatch(updateData({
			tableList,
		}));
		dispatch(updatePage({
			total: data.total,
		}));
	}).catch(res => res.responseMessage && Toast.info(res.responseMessage, 2));
};
export {
	updateData,
	updatePage,
	getData,
	getList,
};
