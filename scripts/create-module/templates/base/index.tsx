import React from 'react';
import {inject} from 'natur';
import style from './style.scss';
import { InjectTemplateModuleType } from './store';

const Template: React.FC<{template: InjectTemplateModuleType}> = ({template}) => {
	const {state, actions, maps} = template;
	return (
		<div className={style.template}>
			{state.name}
			{maps.nameSplit}
		</div>
	);
};


export {state, maps, actions} from './store';
export default inject<{template: InjectTemplateModuleType}>(
	'template',
)(Template);
