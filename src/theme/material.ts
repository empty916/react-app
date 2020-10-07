import { createMuiTheme } from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';
import { Shadows } from '@material-ui/core/styles/shadows';
import r from './r';
// import { lightBlue } from '@material-ui/core/colors';

const defaultShadow: Shadows = [
	'none',
	'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
	'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
	'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
	'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
	'0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
	'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
	'0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
	'0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
	'0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
	'0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
	'0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
	'0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
	'0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
	'0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
	'0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
	'0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
	'0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
	'0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
	'0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
	'0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
	'0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
	'0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
	'0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
	'0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
];

const mainShadow: Shadows = defaultShadow.slice() as Shadows;

mainShadow[24] =	'0 12px 20px -10px rgba(33, 150, 243,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(33, 150, 243,.2)';

const theme = createMuiTheme(
	{
		palette: {
			primary: {
				light: '#64b5f6',
				main: '#2196f3',
				dark: '#1976d2',
				contrastText: '#fff',
			},
			secondary: {
				// light: '#64b5f6',
				main: '#2196f3',
				// dark: '#1976d2',
				// contrastText: '#fff',
			},
		},
		shape: {
			borderRadius: 0,
		},
		shadows: mainShadow,
		props: {
			MuiTextField: {
				variant: 'outlined',
				size: 'small',
				type: 'text',
			},
			// MuiCheckbox: {
			// 	color: 'primary',
			// },
			// MuiRadio: {
			// 	color: 'primary',
			// },
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
						// borderColor: 'blue',
					},
					'&:hover $notchedOutline': {
						// borderColor: '#2196f3',
					},
				},
			},
			// @ts-ignore
			MUIDataTableHeadCell: {
				sortAction: {
					display: 'flex',
					alignItems: 'center',
				},
			},
			MuiAlert: {
				root: {
					minWidth: 250,
				},
			},
			// date picker的主题样式覆盖，详情请看
			// @ts-ignore
			// MuiPickersDay: {
			// 	day: {
			// 		color: lightBlue.A700,
			// 	},
			// 	daySelected: {
			// 		backgroundColor: lightBlue['400'],
			// 	},
			// 	dayDisabled: {
			// 		color: lightBlue['100'],
			// 	},
			// 	current: {
			// 		color: lightBlue['900'],
			// 	},
			// },
			// MuiPickersModal: {
			// 	dialogAction: {
			// 		color: lightBlue['400'],
			// 	},
			// },
			// MuiButton: {
			// 	root: {
			// 		padding: `${r(6)} ${r(16)}`,
			// 	},
			// },
		},
		spacing: px => r(px * 8),
	},
	zhCN,
);

export const menuTheme = createMuiTheme(
	{
		palette: {
			type: 'dark',
			action: {
				hover: 'rgba(200, 200, 200, 0.2)',
				hoverOpacity: 0.2,
				selected: 'rgba(200, 200, 200, 0.2)',
				selectedOpacity: 0.2,
			},
		},
		overrides: {
			MuiDrawer: {
				paperAnchorDockedLeft: {
					borderRight: 'none',
				},
			},
			MuiListItem: {
				root: {
					marginTop: 10,
					borderRadius: 0,
					'&$selected,&$selected:hover': {
						boxShadow: mainShadow[24],
						backgroundColor: theme.palette.primary.main,
					},
					transition:
						'all cubic-bezier(0.4, 0, 0.2, 1) 0.3s!important',
				},
				gutters: {
					paddingLeft: 10,
				},
			},
			MuiListItemIcon: {
				root: {
					minWidth: 45,
				},
			},
		},
	},
	zhCN,
);

export default theme;
