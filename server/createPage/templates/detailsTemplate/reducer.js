// 这是自动生成的文件，可以修改。

import * as types from './constants';

const initialState = {
	templateData: {},
};

const template = (state = initialState, {type, data}) => {
	switch (type) {
		case types.UPDATE_DATA:
			/**
			 * 这里返回一定要返回一个新的对象，而不能在原来的state基础上做修改
			 * 正确的是
			 * return { ...state }
			 * 错误的是
			 * state.data = xxx;
			 * return state;
			 *
			 * 要达到newState !== oldState的效果
			 * 视图的数据才会随着更改而更新，否则视图层不会更新
			 */
			return {
				...state,
				...data,
			};
		default:
			return state;
	}
};


export default template;
