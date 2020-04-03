import { createMuiTheme } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

const theme = createMuiTheme({
	shape: {
		borderRadius: 4,
	},
	props: {
		MuiTextField: {
			variant: 'outlined',
			size: 'small',
		},
	},
	overrides: {
		MuiOutlinedInput: {
			inputMarginDense: {
				paddingTop: 9.5,
				paddingBottom: 9.5,
			},
			root: {
				'&$focused $notchedOutline': {
					borderWidth: 1,
				},
				// '&:hover $notchedOutline': {
				// 	borderColor: 'auto',
				// },
			},
		},
	},
}, zhCN);

export default theme;
