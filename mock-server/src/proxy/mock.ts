import commonApi from './api/common';

export const isMock = true; // mock开关
export const allIsMock = true; // 是否所有接口都走mock

const list = [
    ...commonApi,
    'demo/233',
    'cats'
];

export default url => list.some(item => {
    if (isMock && allIsMock) {
        return true;
    }
    if (isMock) {
        return url.indexOf(item) > -1;
    }
    return false;
});
