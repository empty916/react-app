import _NaturService from 'natur-service';
import { StoreModulesType } from '@/store';
import { InjectStoreModule } from 'natur';


export default class NaturService extends _NaturService {
    protected createDispatch<
        ModuleName extends keyof StoreModulesType,
    >(moduleName: ModuleName) {
        return <
            Actions extends InjectStoreModule['actions'],
            ActionName extends keyof Actions,
        >(actionName: ActionName, ...arg: Parameters<Actions[ActionName]>): Promise<ReturnType<Actions[ActionName]>> => {
            return super.dispatch(`${moduleName}/${actionName}`, ...arg).catch((err) => {
                if (err?.code === 0) {
                    return;
                }
                throw err;
            });
        }
	}
    protected dispatch<
        ModuleName extends keyof StoreModulesType,
        ActionName extends keyof StoreModulesType[ModuleName]['actions'],
    >(moduleName: ModuleName, actionName: ActionName, ...arg: any[]) {
		return super.dispatch(`${moduleName}/${actionName}`, ...arg).catch((err) => {
            if (err?.code === 0) {
                return;
            }
            throw err;
        });
    }
}
