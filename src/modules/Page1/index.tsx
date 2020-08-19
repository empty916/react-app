import React from 'react';
import Button from '@base/Button';
import Input from '@base/Input';
import { Box } from '@material-ui/core';
import qs from 'qs';
import history from '@/routes/history';
import { inject } from '@/store';

const injectStore = inject('page1', 'user');

const Page1: React.FC<{location: Location} & typeof injectStore.type> = ({user, location}) => {
	const redirectPath = React.useMemo(() => qs.parse(location?.search?.slice(1))?.redirect, [location]) as string | undefined;
	const login = React.useCallback(() => {
		history.replace({pathname: redirectPath || '/'});
	}, [redirectPath]);
	return (
		<>
			<Box p={2} display='flex'>
				<Box alignSelf='flex-start'>
					<Input
						style={{height: 'auto', width: 300}}
						placeholder='输入用户名后才可以访问用户模块'
						label='用户名'
						InputLabelProps={{shrink: true}}
						value={user.state.name}
						onChange={user.actions.updateName}
					/>
				</Box>
				<Box>
					<Button variant="contained" color='primary' onClick={login}>登录</Button>
				</Box>
			</Box>

		</>
	);
};


export {
	state,
	actions,
} from './store';

export default injectStore(Page1);
