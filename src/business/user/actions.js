// // import {history} from '@react-router';
// import {userService} from '@client/service';
// // import {cookie} from '@utils';
// import {message} from 'antd';
// import * as type from './constants';

// const updateData = data => ({
// 	type: type.UPDATE_DATA,
// 	data,
// });

// const login = params => dispatch => userService.login(params)
// 	.then(res => {
// 		const { data } = res.data;
// 		console.log(data);
// 		const param = {
// 			user: data.user, // 用户信息
// 			tenant: data.tenant, // 租户信息
// 			roleList: data.roleList, // 角色列表
// 			userAuths: data.powerList, // 当前登录用户所有物理权限（菜单权限，按钮权限
// 			permisssionMap: data.permisssionMap,
// 		};
// 		// if (data.powerList) {
// 		// 	param.userAuths = data.powerList;
// 		// }
// 		dispatch(updateData(param));
// 	})
// 	.catch(res => res.data.responseMessage && message.error(res.data.responseMessage));

// export {
// 	updateData,
// 	login,
// };
