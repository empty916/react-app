import React from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { inject } from '@/store';
import { Box, Slide } from '@material-ui/core';


const injector = inject('toast');

const mt50 = {
	marginTop: 50,
};
const alertStyle = {
	marginTop: 20,
};

const position: SnackbarOrigin = {
	vertical: 'top',
	horizontal: 'center',
};

function Toast({toast}: typeof injector.type) {
	return (
		<Snackbar
			anchorOrigin={position}
			style={mt50}
			open={toast.state.length !== 0}
		>
			<Box
				flexDirection='column'
			>
				{
					toast.state.map(ti => (
						<Slide key={ti.id} direction="down" in={ti.show} mountOnEnter unmountOnExit>
							<Alert style={alertStyle} variant="filled" severity={ti.type}>{ti.text}</Alert>
						</Slide>
					))
				}
			</Box>
		</Snackbar>
	);
}

export default injector(Toast);
