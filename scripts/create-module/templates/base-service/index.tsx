import React from 'react';
import {inject} from 'natur';
import { StoreModulesType } from '@/store';
import style from './style.scss';

const Template: React.FC<{template: StoreModulesType['template']}> = ({template}) => {
	const {state, actions, maps} = template;
	return (
		<div className={style.template}>
			{state.name}
			{maps.nameSplit}
		</div>
	);
};


type StoreType = {template: StoreModulesType['template']};

export {state, maps, actions} from './store';
export default inject<StoreType>('template')(Template);
