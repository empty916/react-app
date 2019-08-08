import React from 'react';
import Inject from '@inject';
import style from './style.scss';

const Page3: React.FC<any> = (p: any) => {
	console.log('page3 render');
	return <div className={style.page3}>page3</div>;
};

export default Inject('page3')(Page3);
