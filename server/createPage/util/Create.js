/* eslint-disable */
const ReadFile = require('./ReadFile');
const Replace = require('./Replace');
const path = require('path');
const fs = require('fs');
const { reduxPath, routePath, dealFileList, pagesPath } = require('../config');

const pathRes = p => path.resolve(__dirname, p);
const dirPathRes = (...arg) => path.join(__dirname, '..', pagesPath, ...arg);
const filePathRes = (dirPath, filePath) => path.resolve(__dirname, `../${pagesPath}`, `${dirPath}/${filePath}`);
const reduxIndexPath = pathRes(`../${reduxPath}`);

class Create {
    constructor(fileName, tmplType){
		this.filePath = fileName;
        this.fileName = fileName.replace(/\/([a-zA-z])/g, (...arg) => arg[1].toUpperCase());
		if(tmplType) {
            this.tmplType = tmplType;
        }
    }
    createFiles() {
        const pageFileDataList = this.createPageDataByTemp(this.fileName);

        const pageFileDatas = pageFileDataList.map(item => ({
            path: filePathRes(this.filePath, item.fileName),
            data: item.fileData,
        }));
		this.createPageDir();
		this.createPageFiles(pageFileDatas);
    }
    // 根据模版数据创建用户需要的页面数据
    createPageDataByTemp(pageName){
        const pageFileDataList = dealFileList.map(item => {
            const templateFileData = ReadFile.readTemplate(item, this.tmplType);
            const newPageActionsFileData = Replace.replaceTemplateData(templateFileData, pageName);
            return {
                fileName: item,
                fileData: newPageActionsFileData,
            };
        });
        return pageFileDataList;
    }
    createPageDir(){
		const filePathNodes = this.filePath.split('/');
		filePathNodes.forEach((pathNode, index) => {
			const pageDirPath = dirPathRes(...filePathNodes.slice(0, index + 1));
			const isExist = fs.existsSync(pageDirPath);
			if (!isExist) {
				fs.mkdirSync(pageDirPath);
			}
		})
    }
    // 创建一个文件
    createPageFile(path, data){
        fs.writeFileSync(path, data);
    }
    /**
     * 创建一组文件
     * @param pageFilesData {
     *  path: 文件路径
     *  data: 文件数据
     * }
     */
    createPageFiles(pageFilesData){
        pageFilesData.forEach(item => fs.writeFileSync(item.path, item.data))
    }
    insertStr(targetStr, insertStr, signReg){
        const signMatchInfo = targetStr.match(signReg);
        return targetStr.replace(signMatchInfo[0], signMatchInfo[0]+insertStr);
    }
    // 废弃！将新的页面与redux链接起来
    createReduxLink(){

        let reduxIndexData = ReadFile.readFile(reduxIndexPath);
        const importStore = `import ${this.fileName}Store from '../modules/${this.fileName}/reducer'\n`;
        const importActions = `import * as ${this.fileName}Actions from '../modules/${this.fileName}/actions'\n`;
        const reducerInsertSignReg = /导入\s{0,}red[a-z]{0,}\n/i;
        const actionsInsertSignReg = /导入\s{0,}act[a-z]{0,}\n/i;
        const reducerExportSignReg = /allReducer[\s=]{0,}{\n/i;
        const actionsExportSignReg = /allActions[\s=]{0,}{\n/i;

        reduxIndexData = this.insertStr(reduxIndexData, importStore, reducerInsertSignReg);
        reduxIndexData = this.insertStr(reduxIndexData, importActions, actionsInsertSignReg);

        reduxIndexData = this.insertStr(reduxIndexData, `    ${this.fileName}Store,\n`, reducerExportSignReg);
        reduxIndexData = this.insertStr(reduxIndexData, `    ${this.fileName}Actions,\n`, actionsExportSignReg);

        this.createPageFile(reduxIndexPath, reduxIndexData);
    }

    // 将新的页面放到route中
    createRouteLink(){
        const _routePath = pathRes(`../${routePath}`);
        let routeData = ReadFile.readFile(_routePath);
        const routeReg = /childRoutes: [\s\n:\[]{0,}/;
        // insertStr的代码格式别动，否则设置的route配置的代码格式也会乱掉
        // const insertStr = `{
        //         path: '${this.filePath}',
        //         breadcrumbName: '${Replace.getCapitalizedStr(this.fileName)}',
        //         component: require('@client/modules/${this.filePath}'),
		// 	}, \n            `;
		const insertStr = `{
				path: '${this.filePath}',
				breadcrumbName: '${Replace.getCapitalizedStr(this.fileName)}',
				getComponent(location, cb) {
					import(/* webpackChunkName: '${this.fileName}' */ '@client/modules/${this.filePath}')
						.then(module => cb(null, module));
				},
			},\n			`;
        routeData = this.insertStr(routeData, insertStr, routeReg);
        this.createPageFile(_routePath, routeData);
    }
}

module.exports = Create;
