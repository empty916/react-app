import React from 'react';
import { inject } from '@/store';
import styles from './style.scss';
import { Box } from '@material-ui/core';

const injector = inject('page3');
const Page3: React.FC<typeof injector.type> = () => (
	<Box className={styles.page3} p={2}>
		page3
	</Box>
);
export default injector(Page3);
