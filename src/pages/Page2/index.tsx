import React, {useEffect} from 'react';
import style from './style.scss';
import Pack from '@client/Charts/Pack'
import data from '@client/Charts/Pack/flare.json'

const Page2: React.FunctionComponent = (p: any) => {
	useEffect(
		() => {
			const pack = new Pack({
				selector: `.${style.page2}`,
				data,
			});
			pack.render();
			return () => pack.destroy();
		},
		[]
	)
	return (
		<div className={style.page2}></div>
	);
}

export default Page2;
