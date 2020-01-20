import commonApi from './api/common';

export const isMock = true;
const list = [
    ...commonApi,
    'demo/233',
];

export default url => list.some(item => {
    if (isMock) {
        return url.indexOf(item) > -1;
    }
});
