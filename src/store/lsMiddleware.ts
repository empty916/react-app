import { Middleware } from 'natur';

type Data = { [m: string]: any };

const setLsData = (name: string, data: Data) => window.localStorage[name] = JSON.stringify(data);
const getLsData = (name: string) => JSON.parse(window.localStorage[name]) as Data;
const removeLsData = (name: string) => window.localStorage.removeItem(name);
const getKeys = (keysReg: RegExp) => Object.keys(window.localStorage).filter(keysReg.test.bind(keysReg));
const lsHasData = (keysReg: RegExp): boolean => !!getKeys(keysReg).length;


type CreateLocalStorageMiddleware = {
	name?: string,
	time?: number,
	exclude?: Array<RegExp|string>,
	specific?: {
		[n: string]: number,
	}
}
function createLsMid({name = 'natur', time = 100, exclude, specific = {}}: CreateLocalStorageMiddleware) {
	let lsData: Data = {};
	const dataPrefix = `${name}/`;
	const keyOfNameReg = new RegExp(`^${dataPrefix}[^]+`);
	const isSaving: any = {};
	const saveToLocalStorage = (key: string|number, data: any) => {
		const _time = specific[key] !== undefined ? specific[key] : time;
		console.log(key, _time);
		if (_time === 0) {
			setLsData(`${dataPrefix}${key}`, data);
		} else {
			clearTimeout(isSaving[key]);
			isSaving[key] = setTimeout(() => setLsData(`${dataPrefix}${key}`, data), time);
		}
	};
	const excludeModule = (targetName: string) => {
		if (exclude) {
			const shouldExclude = exclude.some(exc => {
				if (exc instanceof RegExp) {
					return exc.test(targetName);
				}
				return exc === targetName;
			});
			return shouldExclude;
		}
		return false;
	};
	const updateData = (
		data: Data,
		record: { moduleName: string | number; state: any },
	) => {
		if (excludeModule(record.moduleName as string)) {
			return;
		}
		data[record.moduleName] = record.state;
		saveToLocalStorage(record.moduleName, record.state);
	};

	const lsMiddleware: Middleware = () => next => record => {
		updateData(lsData, record);
		return next(record);
	};
	const getData = () => lsData;
	const clearData = () => {
		lsData = {};
		getKeys(keyOfNameReg).forEach(removeLsData);
	};

	if (lsHasData(keyOfNameReg)) {
		try {
			lsData = getKeys(keyOfNameReg).reduce((res, key) => {
				res[key.replace(dataPrefix, '')] = getLsData(key);
				return res;
			}, {} as Data);
		} catch (error) {
			lsData = {};
		}
	}

	return {
		middleware: lsMiddleware,
		getData,
		clearData,
	};
}

export default createLsMid;
