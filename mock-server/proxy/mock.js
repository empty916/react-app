const commonApi = require('./api/common')

const isMock = true;
const list = [
	...commonApi,
];


module.exports = (url) => list.some(item => {
    if(isMock){
        return item === url;
    }
});
module.exports.isMock = isMock;