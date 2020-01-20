import React from 'react';
import style from './style.scss';
import Inject from '@inject';

const Template: React.FC<any> = (p: any) => {
	const {
		template: {state, actions, maps},
	} = p;
	console.log(actions);
	return (
		<div className={style.template}>
			{state.name}
			{maps.nameSplit}
		</div>
	);
};


export {state, maps, actions} from './store';
export default Inject(
	'template',
)(Template);
