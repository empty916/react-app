import NaturService from 'natur-service';
import store, { LM, M } from '@/store';


export default class extends NaturService<M, LM>{
    constructor(_store: typeof store = store) {
        super(_store);
        this.start();
    }
    start() {}
    dispatch: NaturService<M, LM>['dispatch'] = (...arg) => {
        return super.dispatch(arg[0], arg[1], ...(arg as any).slice(2)).catch(e => {
            if (e?.code === 0) {
                return;
            }
            throw e;
        }) as any;
    }
};