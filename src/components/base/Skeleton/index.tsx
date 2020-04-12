import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';

export default () => (
	<Box p={2}>
		<Skeleton animation="wave" />
		<Skeleton animation="wave" />
	</Box>
);
