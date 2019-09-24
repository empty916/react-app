import React, {
// useEffect,
} from 'react';
// import axios from '@client/utils/axios';
import {useInject} from 'react-natural-store';
// import Inject from '@inject';
import style from './style.scss';

const Page2: React.FC<any> = () => {
	// console.log(p);
	const [page2, app] = useInject('page2', 'app');
	if (!page2) {
		return <>loading</>;
	}
	const {state, actions} = page2;
	// useEffect(() => {
	// 	axios.get('/test')
	// 		.then(console.log);
	// }, []);
	const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => actions.changePageName(e.target.value);
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
Page2.displayName = 'Page2';
export default Page2;
