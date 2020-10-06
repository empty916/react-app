import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { inject } from '@/store';
import { Box, Slide } from '@material-ui/core';


const injector = inject('toast');

const mt50 = {
	marginTop: 50,
};
const mt20 = {
	marginTop: 20,
};

function Toast({toast}: typeof injector.type) {
	if (toast.state.length === 0) {
		return null;
	}
	return (
		<>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				style={mt50}
				open
			>
				<Box flexDirection='column'>
					{
						toast.state.map(ti => (
							<Slide key={ti.id} direction="down" in={ti.show} mountOnEnter unmountOnExit>
								<Alert style={mt20} variant="filled" severity={ti.type}>{ti.text}</Alert>
							</Slide>
						))
					}
				</Box>
			</Snackbar>
		</>
	);
}

export default injector(Toast);
