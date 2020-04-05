import React from 'react';
import Inject from '@inject';
import history from '@/routes/history';
import { Box } from '@material-ui/core';
import style from './style.scss';

const goPage1 = () => history.push({
	pathname: '/page1',
	search: '?id=1',
});

const UserList: React.FC<any> = ({user}: any) => (
	<Box p={2} className={style.userList}>
		当前登录用户名：
		<input type="text" value={user.state.name} onChange={user.actions.updateName} />
		<button onClick={goPage1}>
			go to page1
		</button>
	</Box>
);

export default Inject('user')(UserList);
