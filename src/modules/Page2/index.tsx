/* eslint-disable */
import React, {
	useEffect,
} from 'react';
// import axios from '@/utils/axios';
import { InjectStoreModule } from 'natur';
import Inject from '@inject';
import style from './style.scss';

type PageProps = {
	page2: InjectStoreModule,
	app: InjectStoreModule,
}
const Page2: React.FC<PageProps> = ({page2, app}) => {
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
			<br />
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
			<button onClick={() => actions.asyncChangePageName('page2 asyncChangePageName', state)}>change page2 name</button>
		</div>
	);
};


export {state, maps} from './state';
export {default as actions} from './actions';
// Page2.displayName = 'Page2';
export default Inject<PageProps>(['page2', {state: ['count']}], ['app', {}] as any)(Page2);
