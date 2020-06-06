import React from 'react';
import { inject } from 'natur';
import { InjectPage3ModuleType } from './store';


const Page3: React.FC<{ page3: InjectPage3ModuleType }> = () => (
	<div style={{ overflow: 'hidden' }}>
		<div
			style={{
				float: 'left',
				width: 100,
				height: '100%',
				background: 'aqua',
			}}
		>
			left
		</div>
		<div
			style={{
				float: 'right',
				width: 100,
				height: '100%',
				background: 'aqua',
			}}
		>
			right
		</div>
		<div
			style={{
				background: 'blueviolet',
				overflow: 'hidden',
				height: '100%',
			}}
		>
			content
		</div>
		<div style={{ clear: 'both' }} />
	</div>
);
export { state, maps, actions } from './store';
export default inject<{ page3: InjectPage3ModuleType }>('page3')(Page3);
