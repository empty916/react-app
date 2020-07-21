import {StoreModule} from 'natur';

type AnyFun = (...args: any) => any;
type Fn<T extends Array<any>, S extends any> = (...arg: T) => S;
type ActionArg<Action extends AnyFun> = Parameters<Action>;

type ActionActualReturnType<Action extends AnyFun> =
	(ReturnType<Action> extends AnyFun ? ReturnType<ReturnType<Action>> : ReturnType<Action>);

type ActionReturnType<Action extends AnyFun, S extends any> =
	ActionActualReturnType<Action> extends Partial<S> ? S :
		(ActionActualReturnType<Action> extends Promise<Partial<S>> ? Promise<S> :
			ActionActualReturnType<Action> extends undefined ? undefined :Promise<undefined>);

export type GenActionsType<OAS extends {[m: string]: AnyFun}, S> = {
	[a in keyof OAS]: Fn<ActionArg<OAS[a]>, ActionReturnType<OAS[a], S>>
};


type Maps = {
	[m: string]: (string | AnyFun)[];
}
type MapsFunType<M extends Maps, S extends StoreModule['state']> = {
	[k in keyof M]: Exclude<Extract<M[k][0], AnyFun>, (s: S) => any>;
}
type MapsFun = {
	[m: string]: AnyFun;
}
type MapsReturnType<MF extends MapsFun> = {
	[k in keyof MF]: ReturnType<MF[k]>;
}

type GenMapsType<M extends Maps, S extends StoreModule['state']> = MapsReturnType<MapsFunType<M, S>>;

type StoreModuleWithMaps = {
	state: StoreModule['state'];
	actions: StoreModule['actions'];
	maps: Maps;
}
type StoreModuleWithoutMaps = {
	state: StoreModule['state'];
	actions: StoreModule['actions'];
}

export type ModuleType<M extends StoreModuleWithMaps|StoreModuleWithoutMaps> = {
	[m in keyof M]: m extends 'state' ? M['state'] :
		(m extends 'actions' ? GenActionsType<M['actions'], M['state']> :
			(m extends 'maps' ? (M extends StoreModuleWithMaps ? GenMapsType<M['maps'], M['state']> : undefined) : never));
}

/**
 * 获取promise值的类型
 */
export type PickPromiseType<P extends () => Promise<any>> = Parameters<Extract<Parameters<ReturnType<P>['then']>[0], Function>>[0];


export type PromiseModuleType<
	PM extends () => Promise<StoreModuleWithMaps | StoreModuleWithoutMaps>,
	M extends StoreModuleWithMaps | StoreModuleWithoutMaps = PickPromiseType<PM>
> = {
	[m in keyof M]: m extends 'state' ? M['state'] :
		(m extends 'actions' ? GenActionsType<M['actions'], M['state']> :
			(m extends 'maps' ? (M extends StoreModuleWithMaps ? GenMapsType<M['maps'], M['state']> : undefined) : never));
}


export type GenerateStoreType<
	MS extends {
		[m: string]: StoreModuleWithMaps|StoreModuleWithoutMaps
	},
	PMS extends {
		[m: string]: () => Promise<StoreModuleWithMaps|StoreModuleWithoutMaps>
	}
> = {
	[k in keyof MS]: ModuleType<MS[k]>;
} & {
	[k in keyof PMS]: PromiseModuleType<PMS[k]>;
}
