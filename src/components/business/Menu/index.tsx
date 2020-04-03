import React from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Icon,
} from '@material-ui/core';
import {
	makeStyles,
	Theme,
	createStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles';
import { InjectStoreModule, inject } from 'natur';
import clsx from 'classnames';
// icon

import SubList from '@biz/SubList';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 8,
	},
}));

const menuTheme = createMuiTheme({
	palette: {
		type: 'dark',
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
				borderRadius: 4,
				'&$selected,&$selected:hover': {
					boxShadow:
				'0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)',
					backgroundColor: '#00acc1',
				},
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
});

const AppMenu: React.FC<{ app: InjectStoreModule }> = ({ app }) => {
	const classes = useStyles();
	const { isMenuOpen: open, menuData } = app.state;
	const { pathname } = useLocation();
	// console.log(pathname);
	return (
		<ThemeProvider theme={menuTheme}>
			<Drawer
				open={open}
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<List style={{ padding: '0 10px' }}>
					{menuData.map((item: any) => {
						if (!item.children) {
							return (
								<ListItem
									button
									selected={pathname === item.to}
									key={item.title + item.to}
									component={Link as any}
									to={item.to}
								>
									<ListItemIcon>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText primary={item.title} />
								</ListItem>
							);
						}
						return (
							<SubList
								title={item.title}
								key={item.title + String(item.to)}
								pl={30}
								selected={item.children.some(
									({ to }: any) => to === pathname,
								)}
								icon={<Icon>{item.icon}</Icon>}
								open={open}
							>
								{item.children.map((subItem: any) => (
									<ListItem
										button
										selected={pathname === subItem.to}
										key={subItem.title + subItem.to}
										component={Link as any}
										to={subItem.to}
									>
										<ListItemIcon>
											<Icon>{subItem.icon}</Icon>
										</ListItemIcon>
										<ListItemText primary={subItem.title} />
									</ListItem>
								))}
							</SubList>
						);
					})}
				</List>
			</Drawer>
		</ThemeProvider>
	);
};

export default inject<{ app: InjectStoreModule }>([
	'app',
	{ state: ['isMenuOpen', 'menuData'] },
])(AppMenu);
