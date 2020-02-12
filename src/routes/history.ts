import {createHashHistory} from 'history';


const currentHistory = createHashHistory();
// (window as any).currentHistory = currentHistory;

export default currentHistory;
