const glob = require('glob');
const path = require('path');
const fs = require('fs');
const pipe = require('lodash/fp/pipe');
const { getArg } = require('../webpack/utils');

const project = getArg().project || 'src';
const slash = '/';
const matchFileName = 'index.ts';
const moduleDirName = 'pages';
const moduleBasePath = path.join(__dirname, '..', '..', project, moduleDirName);
const projectPath = path.join(__dirname, '..', '..', project).replace(/\\|\//g, slash);


// utils
const removeModuleDirName = p => p.replace(`${slash}${moduleDirName}${slash}`, '');
const removeMatchedFileName = p => p.replace(`${slash}${matchFileName}`, '');
const toCamelName = p => p.replace(new RegExp(`\\${slash}([a-zA-z])`, 'g'), (...arg) => arg[1].toUpperCase());
const firstCharToLowerCase = str => str.slice(0, 1).toLowerCase() + str.slice(1);

const formatModuleName = pipe(removeModuleDirName, removeMatchedFileName, toCamelName, firstCharToLowerCase);
// 首字母小写

const getModuleName = pipe(removeModuleDirName, removeMatchedFileName);


// console.log(projectPath);
const getMatchedFile = () => glob.sync(`${moduleBasePath}${slash}**${slash}${matchFileName}`);
const replaceAbsPath = p => p.replace(projectPath, '');
const addRelativePathHeader = p => `@client${p}`;
const createFileData = (data, moduleNames, formatModuleNames) => `
export default {
	modules: {
		${data}
	},
	moduleNames: [${moduleNames.map(n => `'${n}'`).join(', ')}],
	formatModuleNames: [${formatModuleNames.map(n => `'${n}'`).join(', ')}],
};
`;

const authGetModule = () => {
	const matchFile = getMatchedFile();

	const formatModuleNames = matchFile
		.map(replaceAbsPath)
		.map(formatModuleName);

	const moduleNames = matchFile
		.map(replaceAbsPath)
		.map(getModuleName);


	const addImportStr = (p, index) => `${formatModuleNames[index]}: () => import(/* webpackChunkName:"${formatModuleNames[index]}" */ '${p}'),`;

	const moduleImportStr = matchFile
		.map(replaceAbsPath)
		.map(addRelativePathHeader)
		.map(addImportStr);

	const lazyLoadModuleConfigFileData = createFileData(
		moduleImportStr.join('\n		'),
		moduleNames,
		formatModuleNames,
	);
	try {
		const filePath = path.join(__dirname, 'lazyLoadModuleConfig.js');
		const lastFileData = fs.readFileSync(filePath, 'utf-8');
		if (lastFileData === lazyLoadModuleConfigFileData) {
			return true;
		}
		return fs.writeFileSync(filePath, lazyLoadModuleConfigFileData);
	} catch (error) {
		console.log(error);
	}
};

module.exports = authGetModule;
