import commonApi from './api/common';

export const isMock = true;
const list = [
    ...commonApi,
];

export default url => list.some(item => {
    if (isMock) {
        return url.indexOf(item) > -1;
    }
});
