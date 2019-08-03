
import { formatModuleName, removeHeadAndExt } from './utils';

const getClientReduxContext = () => {
	const actionsContext = (require as any).context('../pages', true, /index\.ts$/);
	const allModuleNames = actionsContext.keys().map(removeHeadAndExt).map((name: any) => !!name.replace ? name.replace(/\/index$/gi, '') : name);
	console.dir(actionsContext);
	const allFormatModuleNames = allModuleNames.map(formatModuleName);
	// const allModuleLoader = allModuleNames.map(mn => () => import(`@client/pages/${mn}`));
	return {
		allModuleNames,
		allFormatModuleNames,
		// allModuleLoader,
	};
};

/**
 * allModuleNames: ['page1', 'page2', 'pagex/list', 'pagex/add' ...]
 * allFormatModuleNames: ['page1', 'page2', 'pagexList', 'pagexAdd' ...]
 */
const allModules = getClientReduxContext();

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


