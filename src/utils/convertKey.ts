
/* eslint-disable */
/**
 *
 * @param {*} obj
 */
function isObj(obj: any): obj is Object {
	return typeof obj === 'object' && obj !== null;
}

export type ConvertKeyMaps = {
	[k: string]: string;
}

type RevertKey<T extends ConvertKeyMaps, V extends T[keyof T] = T[keyof T]> = {[k in V]: string}

function _reverseKey<T extends ConvertKeyMaps>(convertKeyMaps: T): RevertKey<T> {
	if (!isObj(convertKeyMaps)) {
		throw new Error('convertKeyMaps必须是对象！');
	}

	return Object.keys(convertKeyMaps).reduce((res, oldKey: string) => {
		const newKey = convertKeyMaps[oldKey] as T[keyof T];
		res[newKey] = oldKey;
		return res;
	}, {} as RevertKey<T>);
}

function _convertKeyOfObj<T extends ConvertKeyMaps, S extends T>(convertKeyMaps: T, obj: Partial<S>) {
	if (!isObj(convertKeyMaps)) {
		throw new Error('convertKeyMaps必须是对象！');
	}
	if (!isObj(obj)) {
		throw new Error('obj必须是对象！');
	}
	return Object.keys(convertKeyMaps).reduce((res, oldKey) => {
		const newKey: string = convertKeyMaps[oldKey];
		res[newKey] = obj[oldKey];
		return res;
	}, {} as any);
}

type ConvertKey<C extends ConvertKeyMaps, S extends {[k in keyof C]: any}> = {[k in keyof RevertKey<C>]: any}


type TConvertKey<T extends ConvertKeyMaps> = {
	<S extends {[k in keyof T]: any}>(obj: S):  ConvertKey<T, S>;
	revert: <S extends {[k in keyof RevertKey<T>]?: any}>(obj: S) => {[k in keyof T]?: any};
}


type AnyValue<T extends ConvertKeyMaps> = {[k in keyof T]: any};
/**
 * 转换key
 * @param {*} convertKeyMaps
 * @return convert
 *
 * const convertKeyMaps = {
 *  a: 'name',
 *  b: 'age',
 * };
 * const data = {
 *  a: 'tom',
 *  b: 11,
 * }
 * const convert = convertKey(convertKeyMaps);
 * const myData = convert(data);
 * myData: {
 *  name: 'tom',
 *  age: 11,
 * }
 *
 * convert.revert(myData): {
 *  a: 'tom',
 *  b: 11,
 * }
 */
function convertKey<T extends ConvertKeyMaps>(convertKeyMaps: AnyValue<T>): TConvertKey<T> {
	const reverseKeyMap = _reverseKey(convertKeyMaps as T);
	const convert = <S extends {[k in keyof T]: any}>(obj: S): ConvertKey<T, S> => _convertKeyOfObj(convertKeyMaps as T, obj);
	convert.revert = <S extends {[k in keyof RevertKey<T>]: S[k]}>(obj: S) => _convertKeyOfObj(reverseKeyMap, obj);
	return convert;
}

export default convertKey;
