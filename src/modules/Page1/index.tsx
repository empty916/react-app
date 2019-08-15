import React from 'react';
import Inject from '@inject';
import style from './style.scss';


const Page1List: React.FunctionComponent = (p: any) => (
	<div className={style['page1-list']}>
		<div>{p.page1List.state.pageName}</div>
	</div>
);

export {default as state} from './state';
export {default as actions} from './actions';

export default Inject('page1List')(Page1List);
