import React from 'react';
import Inject from '@client/store/inject';
import style from './style.scss';


const Page1List: React.FunctionComponent = (p: any) => {
	return (
		<div className={style['page1-list']}>
			{p.page1List.state.pageName}
		</div>
	);
}


export default Inject('page1List')(Page1List);
