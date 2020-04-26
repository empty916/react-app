/* eslint-disable */
import React from 'react';
import { InjectStoreModule } from 'natur';
import Inject from '@inject';
import Button from '@base/IconButton'
import Input from '@base/Input'
import Icon from '@material-ui/core/Icon';
import store from '@/store';
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
			<Input
				type="text"
				label='page2 name'
				value={state.pageName}
				onChange={changePage2}
			/>
			<br/><br/>
			<Input
				type="text"
				label='page2 name'
				value={app.state.name}
				onChange={e => app.actions.update(e.target.value)}
			/>
			<br />
			count:
			{state.count}
			<Button color='secondary' size='small' onClick={() => actions.inc(state)}>
				<Icon>add_circle</Icon>
			</Button>
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
export default Inject<PageProps>('page2', ['app', {}])(Page2);
// export default Page2;
