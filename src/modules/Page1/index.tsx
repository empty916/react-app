import React from 'react';
import Button from '@base/Button';
import Input from '@base/Input';
import { Box } from '@material-ui/core';
import qs from 'qs';
import history from '@/routes/history';
import { inject } from '@/store';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

const injector = inject('page1', 'user', 'page2');

const Page1: React.FC<{location: Location} & typeof injector.type> = ({user, location}) => {
	const redirectPath = React.useMemo(() => qs.parse(location?.search?.slice(1))?.redirect, [location]) as string | undefined;
	const login = React.useCallback(() => {
		history.replace({pathname: redirectPath || '/'});
	}, [redirectPath]);
	// React.useEffect(() => {
	// 	page1.actions.asyncChangePageName('0000');
	// 	page1.actions.asyncChangePageName1('111');
	// 	page1.actions.asyncChangePageName2('222');
	// }, [page1.actions]);
	return (
		<>
			<Box p={2} display='flex'>
				<Box alignSelf='flex-start'>
					<Input
						placeholder='输入用户名后才可以访问用户模块'
						label='用户名'
						error
						helperText='111'
						variant='outlined'
						InputLabelProps={{shrink: true}}
						value={user.state.name}
						onChange={user.actions.updateName}
						InputProps={{
							startAdornment: (
								<InputAdornment className='11' position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				<Box>
					<Button variant="contained" color='primary' onClick={login}>登录</Button>
				</Box>
			</Box>

		</>
	);
};


export default injector(Page1);
