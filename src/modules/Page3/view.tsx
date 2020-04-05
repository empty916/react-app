import React from 'react';
import Inject from '@inject';
import { Box } from '@material-ui/core';

const Page3: React.FC<any> = () => <Box p={2}>pape3</Box>;

export default Inject('page3')(Page3);
