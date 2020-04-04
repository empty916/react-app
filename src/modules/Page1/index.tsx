import React from 'react';
import Inject from '@inject';
// import qs from 'query-string';
import Input from '@base/Input';
import { InjectStoreModule } from 'natur';
import { Box, GridList, GridListTile } from '@material-ui/core';

const Page1: React.FC<{user: InjectStoreModule}> = ({user}) => (
	<>
		<Box p={2} display='flex'>
			<Box alignSelf='flex-start'>
				<Input
					style={{height: 'auto', width: 300}}
					placeholder='输入用户名后才可以访问page3'
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

export {default as state} from './state';
export {default as actions} from './actions';

export default Inject('page1', 'user')(Page1);
