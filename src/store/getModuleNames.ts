
import { formatModuleName, removeHeadAndExt } from './utils';
import lazyLoadModuleConfig from '../../server/autoGetModule/lazyLoadModuleConfig'

const {moduleNames, formatModuleNames, modules} = lazyLoadModuleConfig;

const getModule = () => {
	const baseModule = ['app'];
	return {
		allModuleNames: [...baseModule, ...moduleNames],
		allFormatModuleNames: [...baseModule, ...formatModuleNames],
		modules: modules as {[p: string]: () => Promise<any>},
	};
};

/**
 * allModuleNames: ['page1', 'page2', 'pagex/list', 'pagex/add' ...]
 * allFormatModuleNames: ['page1', 'page2', 'pagexList', 'pagexAdd' ...]
 */
export const allModules = getModule();

/**
 * demo: 'page1' => ['page1']
 * demo: 'pagex' => ['pagexList', 'pagexAdd']
 * demo: 'pagexLi' => ['pagexList']
 * demo: 'pagexA' => ['pagexAdd']
 * demo: 'pagef' => []
 * @param moduleName
 */
export const matchModule = (moduleName: string): {matchedModulesName: string[], matchedFormatModulesName: string[]} => {
	const matchedModulesIndex =  allModules.allFormatModuleNames.reduce((matchedModulesIndex: number[], fmn: string, index: number) => {
		const searchFMN = formatModuleName(moduleName);
		if (new RegExp(searchFMN, 'i').test(fmn)) {
			matchedModulesIndex.push(index);
		}
		return matchedModulesIndex;
	}, []);
	const  matchedModulesName = allModules.allModuleNames.filter((_:any, index: number) => matchedModulesIndex.includes(index));
	const  matchedFormatModulesName = allModules.allFormatModuleNames.filter((_:any, index: number) => matchedModulesIndex.includes(index));
	return {
		matchedModulesName,
		matchedFormatModulesName,
	}
}


