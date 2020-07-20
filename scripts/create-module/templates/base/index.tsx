import React from 'react';
import {inject} from 'natur';
import { StoreType } from '@/store';
import style from './style.scss';



const Template: React.FC<{template: StoreType['template']}> = ({template}) => {
	const {state, actions, maps} = template;
	return (
		<div className={style.template}>
			{state.name}
			{maps.nameSplit}
		</div>
	);
};


type StoreType = {template: StoreType['template']};

export {state, maps, actions} from './store';
export default inject<StoreType>('template')(Template);
