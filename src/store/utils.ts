
import pipe from 'lodash/fp/pipe';
import curry from 'lodash/fp/curry';
import _shadowEqual from './shadowEqual'

type anyFn = (substring: string, ...args: any[]) => string;
// type TCreateStrReplace =
// (searchValue: string, replaceValue: string) => string;
// (searchValue: RegExp, replaceValue: string) => string;

const createStrReplace = curry((replaceCondition: string|RegExp, replacer: any, str: string) => !!str.replace ? str.replace(replaceCondition, replacer) : str);
// 去除./和.js字符
export const removeHeadAndExt = createStrReplace(/\.\/|\.(j|t)s/g, '');
// aaa/ccc/bbb/fff => aaaCccBbbFff
const toCamelName = createStrReplace(/\/([a-zA-z])/g, (...arg: any[]) => arg[1].toUpperCase());
// 首字母小写
const firstCharToLowerCase = (str: string) => str.slice(0, 1).toLowerCase() + str.slice(1);


// 判断str中是否存在斜杠
const hasSlash = (str: string) => /\//g.test(str);
/**
 * demo： ./aaa/ccc/bbb/fff.js => aaaCccBbbFff
 * @param path
 */
export const formatModuleName = pipe(
	removeHeadAndExt,
	toCamelName,
	firstCharToLowerCase,
	// addStateStr
);

/**
 * demo： ./aaa/ccc/bbb/fff.js => aaaCccBbbFff
 * demo： aaaCccBbbFff => aaaCccBbbFff
 * @param path
 */
// export const formatModuleName = (str: string): string => {
// 	if (hasSlash(str)) {
// 		return _formatModuleName(str);
// 	}
// 	return str;
// }

type TAddTailMark = (a: string, b: string) => string;
const addTailMark = curry((tailMark:string, str: string) => {
	if (new RegExp(`${tailMark}$`, 'gi').test(str)) {
		return formatModuleName(str);
	}
	return formatModuleName(str + tailMark);
});

const formatState = (addTailMark: (a: string) => string) => <T extends {[p: string]: any}>(stateOrActions: T): T => Object.keys(stateOrActions).reduce(
	(cs: any, key: string) => {
		cs[addTailMark(key)] = stateOrActions[key];
		return cs;
	}
,{});

// const formatState = curry(_formatState);
type TAnyObj = {
	[p: string]: any;
}

// 比较两层属性是否相等
export const shadowEqual = _shadowEqual;
export const addStateTailMark = addTailMark('State');
export const addActionsTailMark = addTailMark('Actions');
export const formatStateObj = formatState(addStateTailMark);
export const formatActionsObj = formatState(addActionsTailMark);
