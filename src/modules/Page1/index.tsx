import React from 'react';
import Inject from '@inject';
import Input from '@base/Input';
import { Box, GridList, GridListTile } from '@material-ui/core';
import { InjectUserModuleType } from '@/store/user.store';

const Page1: React.FC<{user: InjectUserModuleType}> = ({user}) => (
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
			<Box flex='1' alignSelf='flex-start' display='flex'>
				<GridList cellHeight={50} cols={3} style={{width: 400, flex: 1}}>
					<GridListTile cols={2} rows={1}>
						<img src="http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg" alt=""/>
					</GridListTile>
					<GridListTile cols={1} rows={1}>
						<img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""/>
					</GridListTile>
					<GridListTile cols={3} rows={1}>
						<img src="http://bbs.jooyoo.net/attachment/Mon_0905/24_65548_2835f8eaa933ff6.jpg" alt=""/>
					</GridListTile>
				</GridList>
			</Box>
		</Box>

	</>
);


export {
	state,
	actions,
} from './store';

export default Inject<{user: InjectUserModuleType}>('page1', 'user')(Page1);
