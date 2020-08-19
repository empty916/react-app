import _NaturService from 'natur-service';
import store, { StoreType } from '@/store';

export default class NaturService extends _NaturService {
    protected watch<
        ModuleName extends keyof StoreType,
    >(moduleName: ModuleName, wachter: (p: {
        actionName?: keyof StoreType[ModuleName]['actions'],
        state: StoreType[ModuleName]['state'] | undefined,
        type: 'init' | 'update' | 'remove',
        newModule: StoreType[ModuleName] | undefined,
        oldModule: StoreType[ModuleName] | undefined,
    }) => any) {
        super.watch(moduleName, wachter as any);
    }
    protected dispatch<
        MN extends keyof StoreType,
        AN extends keyof StoreType[MN]['actions'],
    >(moduleName: MN, actionName: AN, ...arg: Parameters<Extract<StoreType[MN]['actions'][AN], (...arg: any) => any>>) {
		return super.dispatch(`${moduleName}/${actionName}`, ...arg).catch((err) => {
            if (err?.code === 0) {
                return;
            }
            throw err;
        });
    }
}
