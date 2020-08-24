import React, { useContext } from 'react';
import { inject } from '@/store';


const Context = React.createContext<string>('1');
const Child: React.FC = () => {
	const context = useContext(Context);
	return <>{context}</>;
};
const injector = inject('page3');
const Page3: React.FC<typeof injector.type> = () => (
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
			<Context.Provider value='1'>
				<Child />
				<br/>
				<Context.Provider value='2'>
					<Child />
					{' > '}
					<Context.Provider value='2.1'>
						<Child />
					</Context.Provider>
				</Context.Provider>
				<br/>
				<Context.Provider value='3'>
					<Child />
				</Context.Provider>
				<br/>
			</Context.Provider>
			content
		</div>
		<div style={{clear: 'both'}} />
	</div>
);
export {state, maps, actions} from './store';
export default injector(Page3);
