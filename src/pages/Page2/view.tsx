import React, {useEffect} from 'react';
import style from './style.scss';
import Inject from '@client/store/inject'
import Pack from '@client/Charts/Pack'
import data from '@client/Charts/Pack/flare.json'

// console.log(style);

const Page2: React.FC<any> = (p: any) => {
	// useEffect(
	// 	() => console.log(p),
	// 	[p]
	// )
	const { page1: {state, actions} } = p;
	return (
		<div className={style.page2}>
			<input
				type="text"
				value={state.pageName}
				onChange={e => actions.changePageName(e.target.value)}
			/>
			<button onClick={() => actions.asyncChangePageName('page1 asyncChangePageName')}>change page1 name</button>
		</div>
	);
}

export {default as state} from './state';
export {default as actions} from './actions';
export default Inject('page1', 'page2')(Page2);
