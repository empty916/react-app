import React from 'react';
import inject from '@client/store/inject';
import style from './style.scss';

const Page3: React.FC<any> = (p: any) => {
	return <div className={style.page3} >page3</div>;
};

export default inject('page3')(Page3);
