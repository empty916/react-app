import React from 'react';
// import { History } from 'history';
// import Tree from '@client/Charts/Tree'
// import data from '@client/Charts/Tree/flare.json'
import Inject from '@client/store/inject';
import style from './style.scss';


const Page1: React.FunctionComponent = (p: any) => {
	// const tree = useRef<Tree>();

	// useEffect(
	// 	() => {
	// 		tree.current = new Tree({
	// 			selector: '.tree',
	// 			data: data,
	// 		});
	// 		tree.current.render();
	// 	},
	// 	[],
	// )
	// console.log(p);
	return (
		<div className={style.page1}>
			page1
			{p.page1.state.pageName}
			{/* <Test></Test> */}
			{/* <button onClick={() => (tree.current as Tree).render()}>render</button> */}
			<div className='tree'></div>
		</div>
	);
}


export default Inject('page1')(Page1);
