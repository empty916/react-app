import _NaturService from 'natur-service';
import { StoreType, ActionsType } from '@/store';
import { InjectStoreModule } from 'natur';


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
    protected createDispatch<
        ModuleName extends keyof StoreType,
    >(moduleName: ModuleName) {
        const dispatch = <
            A extends InjectStoreModule['actions'],
            AN extends keyof A = keyof A,
        >(
            actionName: AN,
            ...arg: Parameters<A[AN]>
        ): Promise<ReturnType<A[AN]>> => {
            return super.dispatch(`${moduleName}/${actionName}`, ...arg).catch((err) => {
                if (err?.code === 0) {
                    return;
                }
                throw err;
            });
        }
        dispatch.type = null as any as StoreType[ModuleName]['actions'];
        return dispatch;
	}
    protected dispatch<
        ModuleName extends keyof StoreType,
        ActionName extends keyof ActionsType[ModuleName],
    >(moduleName: ModuleName, actionName: ActionName, ...arg: any) {
		return super.dispatch(`${moduleName}/${actionName}`, ...arg).catch((err) => {
            if (err?.code === 0) {
                return;
            }
            throw err;
        });
    }
}
