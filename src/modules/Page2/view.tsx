import React, {useEffect} from 'react';
import style from './style.scss';
import Inject from '@inject'
// import Pack from '@client/Charts/Pack'
// import data from '@client/Charts/Pack/flare.json'

const Page2: React.FC<any> = (p: any) => {
	const {
		page2: {state, actions},
		app,
	} = p;
	return (
		<div className={style.page2}>
			<input
				type="text"
				value={state.pageName}
				onChange={e => actions.changePageName(e.target.value)}
			/>
			<br/>
			<input
				type="text"
				value={app.state.name}
				onChange={e => app.actions.update(e.target.value)}
			/>
			{/* <button onClick={() => actions.asyncChangePageName('page1 asyncChangePageName')}>change page1 name</button> */}
		</div>
	);
}

export default Inject(
	'page1List',
	'page2',
	'app'
)(Page2);
