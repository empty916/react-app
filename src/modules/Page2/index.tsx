/* eslint-disable */
import React, {
	useEffect,
} from 'react';
import { InjectStoreModule, useInject } from 'natur';
import Inject from '@inject';
import store from '@/store';
import style from './style.scss';

type PageProps = {
	page2: InjectStoreModule,
	app: InjectStoreModule,
}

const Page2: React.FC<PageProps> = ({page2, app}) => {
	useEffect(() => {
		return () => console.log('page2 unmount!');
	}, [])
	const {state, actions, maps } = page2;
	const { countObj, countIsOdd } = maps;
	const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => actions.changePageName(e.target.value, state);
	return (
		<div className={style.page2}>
			<input
				type="text"
				value={state.pageName}
				onChange={changePage2}
			/>
			<input
				type="text"
				value={app.state.name}
				onChange={e => app.actions.update(e.target.value)}
			/>
			<br />
			count:
			{state.count}
			<button onClick={() => actions.inc(state)}>+</button>
			<br />
			countIsOdd：
			{`${countIsOdd}`}
			<br />
		</div>
	);
};


import {state, maps} from './state';
import {default as actions} from './actions';
store.setModule('page2', {
	state,
	maps,
	actions,
})
// Page2.displayName = 'Page2';
export default Inject<PageProps>(['page2', {state: ['count']}], ['app', {}] as any)(Page2);
// export default Page2;
