import React from 'react';
import Inject from '@inject';
import history from '@client/routes/history';
import style from './style.scss';

/* eslint-disable */
const UserList: React.FC<any> = (p: any) => {
	const {
		userList: {state},
	} = p;
	React.useEffect(() => {
		p.userList.actions.asyncUpdate(state);
		p.userList.actions.returnUndef();
		p.userList.actions.thunkReturnUndef();
		p.userList.actions.asyncThunkReturnUndef();
		p.userList.actions.asyncReturnUndef();
	}, []);
	React.useEffect(() => {
		console.log('updated!');
	});
	console.log(p.userList);
	return (
		<div className={style.userList}>
			{state.name}
			<input type="text" value={state.name} onChange={e => p.userList.actions.update({name: e.target.value})} />
			<input type="text" value={state.age} onChange={e => p.userList.actions.update({ ...state, age: e.target.value})} />
			<button onClick={() => history.push('/page1')}>go to page1</button>
			{/* {maps.nameSplit} */}
		</div>
	);
};


export {state, maps, actions} from './store';
export default Inject(
	'userList',
)(UserList);
