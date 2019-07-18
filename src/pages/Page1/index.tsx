import React from 'react';
import { History } from 'history';
import style from './style.scss';

const toPage2 = (history: History) => history.push('/page2');

const Page1: React.FunctionComponent = (p: any) => {
	return (
		<div className={style.page1}>
			page1
			<button onClick={toPage2.bind(null, p.history)}>to page2</button>
		</div>
	);
}

export default Page1;
