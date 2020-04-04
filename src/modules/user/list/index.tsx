import React from 'react';
import Inject from '@inject';
import history from '@/routes/history';
import { Box } from '@material-ui/core';
import style from './style.scss';

const goPage1 = () => history.push({
	pathname: '/page1',
	search: '?id=1',
});

const UserList: React.FC<any> = (p: any) => {
	const {
		userList: {state},
	} = p;
	return (
		<Box p={2} className={style.userList}>
			{state.name}
			<br/>
			<input type="text" value={state.name} onChange={e => p.userList.actions.update({name: e.target.value})} />
			<br/>
			<input type="text" value={state.age} onChange={e => p.userList.actions.update({ age: e.target.value})} />
			<br/>
			<button onClick={goPage1}>
				go to page1
			</button>
		</Box>
	);
};


export {state, maps, actions} from './store';
export default Inject(
	'userList',
)(UserList);
