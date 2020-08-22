import _NaturService from 'natur-service';
import store from '@/store';


_NaturService.storeGetter = () => store;

export default class extends _NaturService<typeof store.type>{
    get store() {
        return this.getStore();
    }
    dispatch: _NaturService<typeof store.type>['dispatch'] = (...arg) => {
        return super.dispatch(arg[0], arg[1], ...(arg as any).slice(2)).catch(e => {
            if (e?.code === 0) {
                return;
            }
            throw e;
        }) as any;
    }
};