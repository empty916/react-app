import React, {useEffect} from 'react';
import style from './style.scss';
import Inject from '@client/store/inject'
// import Pack from '@client/Charts/Pack'
// import data from '@client/Charts/Pack/flare.json'

const Page2: React.FC<any> = (p: any) => {
	const { page1List: {state, actions} } = p;
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

export default Inject('page1List', 'page2')(Page2);
