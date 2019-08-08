import React from 'react';
import style from './style.scss';
import Inject from '@inject';

const Page1List: React.FC<any> = (p: any) => {
	const { page1: {state, actions} } = p;
	return (
		<div className={style['page1-list']}>
			<input
				type="text"
				value={state.pageName}
				onChange={e => actions.changePageName(e.target.value)}
			/>
			<button onClick={() => actions.asyncChangePageName('page1 asyncChangePageName')}>change page1 name</button>
		</div>
	);
};

export default Inject('page1List')(Page1List);
