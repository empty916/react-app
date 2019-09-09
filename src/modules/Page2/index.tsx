import React, {
// useEffect,
} from 'react';
// import axios from '@client/utils/axios';
import style from './style.scss';
import Inject from '@inject';

const Page2: React.FC<any> = (p: any) => {
	// console.log(p);
	const {
		page2: {state, actions},
		app,
	} = p;
	// useEffect(() => {
	// 	axios.get('/test')
	// 		.then(console.log);
	// }, []);
	const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		const res = actions.changePageName(e.target.value);
		console.log(res);
	};
	return (
		<div className={style.page2}>
			<input
				type="text"
				value={state.pageName}
				onChange={changePage2}
			/>
			<br />
			<input
				type="text"
				value={app.state.name}
				onChange={e => app.actions.update(e.target.value)}
			/>
			<button onClick={() => actions.asyncChangePageName('page1 asyncChangePageName')}>change page1 name</button>
		</div>
	);
};


export {state, maps} from './state';
export {default as actions} from './actions';

export default Inject(
	'page1List',
	'page2',
	'app',
)(Page2);
