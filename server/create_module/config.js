
const { defaultProject, defaultSite } = require('../../buildConfig/defaultConfig');

const pagesPath = `../../${defaultProject}/modules/`;
const reduxPath = `../../${defaultProject}/redux/index.js`;
const routePath = `../../buildConfig/site/${defaultSite}/route.js`;
const ReservedFileName = ['app', 'user'];
const createFileNameQuestion = '请输入需要新建的模块名称\n';
// 需要创建的几种文件
const dealFileList = ['actions.ts', 'state.ts', 'style.scss', 'mock.ts', 'index.tsx', 'store.ts'];

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
