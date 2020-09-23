import NaturService from 'natur-service';
import store from '@/store';


export default class extends NaturService<typeof store.type>{
    get store() {
        return this.getStore();
    }
    getStore () {
        return store;
    }
    dispatch: NaturService<typeof store.type>['dispatch'] = (...arg) => {
        return super.dispatch(arg[0], arg[1], ...(arg as any).slice(2)).catch(e => {
            if (e?.code === 0) {
                return;
            }
            throw e;
        }) as any;
    }
};