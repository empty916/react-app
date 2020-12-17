import React from 'react';
import { inject } from '@/store';
import style from './style.scss';


const injector = inject('template');

const Template: React.FC<typeof injector.type> = ({template}) => {
	const {state, maps} = template;
	return (
		<div className={style.template}>
			{state.name}
			{maps.nameSplit}
		</div>
	);
};

export default injector(Template);
