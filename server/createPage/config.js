
const { defaultProject, defaultSite } = require('../../buildConfig/defaultConfig');

const pagesPath = `../../${defaultProject}/pages/`;
const reduxPath = `../../${defaultProject}/redux/index.js`;
const routePath = `../../buildConfig/site/${defaultSite}/route.js`;
const ReservedFileName = ['app', 'user'];
const createFileNameQuestion = '请输入需要新建的模块名称\n';
// 需要创建的几种文件
const dealFileList = ['actions.js', 'constants.js', 'index.js', 'reducer.js', 'style.scss', 'mock.js'];


module.exports = {
	reduxPath,
	routePath,
	pagesPath,
	defaultSite,
	dealFileList,
	defaultProject,
	ReservedFileName,
	createFileNameQuestion,
};
