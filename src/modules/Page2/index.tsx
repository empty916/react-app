import React from 'react';
import Button from '@base/IconButton';
import Input from '@base/Input';
import Icon from '@material-ui/core/Icon';
import style from './style.scss';
import { inject } from '@/store';


const injecter = inject('page2', ['app', {}]);
type PageProps = typeof injecter.type;

const Page2: React.FC<PageProps> = ({page2, app}) => {
	const {state, actions, maps } = page2;
	const { countIsOdd } = maps;
	const changePage2 = (e: React.ChangeEvent<HTMLInputElement>) => actions.changePageName(e.target.value);
	return (
		<div className={style.page2}>
			<Input
				type="text"
				label='page2 name'
				value={state.pageName}
				onChange={changePage2}
			/>
			<br/>
			<br/>
			<Input
				type="text"
				label='page2 name'
				value={app.state.name}
				onChange={e => app.actions.update(e.target.value)}
			/>
			<br />
			count:
			{state.count}
			<Button color='secondary' size='small' onClick={actions.inc}>
				<Icon>add_circle</Icon>
			</Button>
			<br />
			countIsOdd：
			{`${countIsOdd}`}
			<br />
		</div>
	);
};


export {
	state,
	maps,
	actions,
} from './store';

export default injecter(Page2);
