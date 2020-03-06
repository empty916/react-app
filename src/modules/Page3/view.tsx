import React from 'react';
import Inject from '@inject';
import themeStyle from '@/theme/test.scss';
// import style from './style.scss';

const Page3: React.FC<any> = () => {
	console.log('page3 render');
	return <div className={themeStyle.card}>page3</div>;
};

export default Inject('page3')(Page3);
