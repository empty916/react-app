import React from 'react';
import Inject from '@inject';
// import qs from 'query-string';
import Input from '@base/Input';
import { InjectStoreModule } from 'natur';
import { Box } from '@material-ui/core';

const Page1: React.FC<{user: InjectStoreModule}> = ({user}) => (
	<Box p={2} display='flex'>
		<Input label='用户名' value={user.state.name} onChange={user.actions.updateName} />
	</Box>
);

export {default as state} from './state';
export {default as actions} from './actions';

export default Inject('page1', 'user')(Page1);
