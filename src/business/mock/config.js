
/**
 * 需要mock的模块配置，对应的文件名，要写全，
 * 如果写了:'', 所有的mock都会被导入进来
 * 思路是根据文件的路径名，判断下面的配置中是否有元素是路径名的子字符串，如果有则加入对应的mock模块
 */
export const includeMockModules = [
	'page',
];

// mock开关, 是否需要开启mock
// export const mockSwitch = true;
export const mockSwitch = false;
