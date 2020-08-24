import React from 'react';
import history from '@/routes/history';
import { Box } from '@material-ui/core';
import style from './style.scss';
import { inject } from '@/store';

const goPage1 = () => history.push({
	pathname: '/page1',
	search: '?id=1',
});
const injector = inject('user');

const UserList: React.FC<typeof injector.type> = ({user}: any) => (
	<Box p={2} className={style.userList}>
		当前登录用户名：
		<input type="text" value={user.state.name} onChange={user.actions.updateName} />
		<button onClick={goPage1}>
			go to page1
		</button>
	</Box>
);

export default injector(UserList);
