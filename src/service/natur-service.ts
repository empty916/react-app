import _NaturService from 'natur-service';
import { StoreModulesType, ActionsType } from '@/store';
import { InjectStoreModule } from 'natur';


export default class NaturService extends _NaturService {
    protected watch<
        ModuleName extends keyof StoreModulesType,
    >(moduleName: ModuleName, wachter: (p: {
        actionName?: keyof StoreModulesType[ModuleName]['actions'],
        state: StoreModulesType[ModuleName]['state'] | undefined,
        type: 'init' | 'update' | 'remove',
        newModule: StoreModulesType[ModuleName] | undefined,
        oldModule: StoreModulesType[ModuleName] | undefined,
    }) => any) {
        super.watch(moduleName, wachter as any);
    }
    protected createDispatch<
        ModuleName extends keyof StoreModulesType,
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
        dispatch.type = null as any as StoreModulesType[ModuleName]['actions'];
        return dispatch;
	}
    protected dispatch<
        ModuleName extends keyof StoreModulesType,
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
