/* eslint-disable */
import 'mockjs';
import { includeMockModules, mockSwitch } from './config';

// 无需mock的模块配置
// const ignoreMockModules = ['mine'];
const getMockContext = () => {
	const mockContext = require.context('@client/modules', true, /mock\.ts$/);
	return mockContext;
};
/**
 * 根据文件路径生成导入的模块名称
 * demo： ./aaa/ccc/bbb/fff.(t|j)s => aaaCccBbbFff
 * @param path
 */
const formatModuleName = path => {
	// 去除./和.js字符
	let moduleName = path.replace(/\.\/|\.(t|j)s/g, '');
	// aaa/ccc/bbb/fff => aaaCccBbbFff
	moduleName = moduleName.replace(/\/([a-zA-z])/g, (...arg) => arg[1].toUpperCase());
	// 首字母小写
	moduleName = moduleName.slice(0, 1).toLowerCase() + moduleName.slice(1);
	return moduleName;
};

// [String]中是否存在元素是string中的子串
const isStrHasChildInArray = stringArray => strTarget => stringArray.some(str => strTarget.includes(str));

// 模块是否不该导入
// const isModuleNameMatchedIMM = isStrHasChildInArray(ignoreMockModules);

// 模块是否该导入
const shouldModuleImport = isStrHasChildInArray(includeMockModules);


/**
 * 根据context导入模块，并加入忽略导入的配置项；
 * @param {*} context 倒入配置的上下文
 * @param {*} shouldNotImportModule 不该导入配置的判断函数
 */
const importModule = (context, shouldImportModule = shouldModuleImport) => {
	const modules = {};
	context.keys().map(item => {
		if (shouldImportModule(item)) {
			const moduleName = formatModuleName(item);
			modules[moduleName] = context(item);
		}
	});
	return modules;
};

if (mockSwitch && (process.env.NODE_ENV === 'development')) {
	const mockContext = getMockContext();
	importModule(mockContext);
	console.warn('--------您正在处于mock模式下！--------');
	console.warn('mock模块配置: ', includeMockModules.join(', '));
}
