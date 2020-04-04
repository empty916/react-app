import React from 'react';
import Inject from '@inject';
import { Box } from '@material-ui/core';

const Page3: React.FC<any> = () => <Box p={2}>你已经登录！</Box>;

export default Inject('page3')(Page3);
