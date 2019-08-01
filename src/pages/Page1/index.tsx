import React, { useEffect, useRef } from 'react';
import { History } from 'history';
import Tree from '@client/Charts/Tree'
import data from '@client/Charts/Tree/flare.json'
import style from './style.scss';

const toPage2 = (history: History) => history.push('/page2');

const Page1: React.FunctionComponent = (p: any) => {
	const tree = useRef<Tree>();

	useEffect(
		() => {
			tree.current = new Tree({
				selector: '.tree',
				data: data,
			});
			tree.current.render();
		},
		[],
	)
	return (
		<div className={style.page1}>
			page1
			<button onClick={() => (tree.current as Tree).render()}>render</button>
			<div className='tree'></div>
		</div>
	);
}
export {default as state} from './state';
export {default as actions} from './actions';
export default Page1;
