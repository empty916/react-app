import React from 'react';
import Inject from '@inject';
// import { Box } from '@material-ui/core';

const Page3: React.FC<any> = () => (
	<div style={{overflow: 'hidden'}}>
		<div style={{
			float: 'left',
			width: 100,
			height: '100%',
			background: 'aqua',
		}}
		>
			left
		</div>
		<div style={{
			float: 'right',
			width: 100,
			height: '100%',
			background: 'aqua',
		}}
		>
			right
		</div>
		<div style={{
			background: 'blueviolet',
			overflow: 'hidden',
			height: '100%',
		}}
		>
			content
		</div>
		<div style={{clear: 'both'}} />
	</div>
);

export default Inject('page3')(Page3);
