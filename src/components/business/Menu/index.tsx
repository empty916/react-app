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
	ThemeProvider,
} from '@material-ui/core/styles';
import { inject } from '@/store';
import clsx from 'classnames';
import { menuTheme } from '@/theme/material';

// icon
import SubList from '@biz/SubList';
import { Link, useLocation } from 'react-router-dom';
import sideBarBgImg from '@/assets/sidebar.jpg';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
	drawer: {
		position: 'relative',
		zIndex: 1,
		flexShrink: 0,
		width: drawerWidth,
		whiteSpace: 'nowrap',
	},
	paper: {
		backgroundImage: `url(${sideBarBgImg})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundColor: '#fff',
	},
	drawerOpen: {
		width: drawerWidth,
		transition:
			theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
	},
	drawerClose: {
		width: theme.spacing(8),
		overflowX: 'hidden',
		transition:
			theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
	},
	listWrapper: {
		width: '100%',
		minHeight: '100%',
		overflow: 'auto',
		overflowX: 'hidden',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	list: {
		position: 'relative',
		zIndex: 4,
		padding: '0 10px',
		paddingBottom: '100px',
	},
}));
const injector = inject([
	'app',
	{ state: ['isMenuOpen', 'menuData'] },
]);
const AppMenu: React.FC<typeof injector.type> = ({ app }) => {
	const classes = useStyles();
	const { isMenuOpen, menuData } = app.state;
	const [$open, setOpen] = React.useState(isMenuOpen);
	React.useEffect(() => {
		if (isMenuOpen === false) {
			setOpen(false);
		}
	}, [isMenuOpen, setOpen]);
	const open = React.useMemo(() => {
		if (isMenuOpen) {
			return isMenuOpen;
		}
		return $open;
	}, [isMenuOpen, $open]);
	const openMenu = React.useCallback(() => {
		if (!isMenuOpen) {
			setOpen(true);
		}
	}, [setOpen, isMenuOpen]);
	const closeMenu = React.useCallback(() => {
		if (!isMenuOpen) {
			setOpen(false);
		}
	}, [setOpen, isMenuOpen]);

	const { pathname } = useLocation();
	return (
		<ThemeProvider theme={menuTheme}>
			<Drawer
				onMouseEnter={openMenu}
				onMouseLeave={closeMenu}
				open={open}
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx(classes.paper, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.listWrapper}>
					<List className={classes.list}>
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
										{item.icon && (
											<ListItemIcon>
												<Icon>{item.icon}</Icon>
											</ListItemIcon>
										)}
										<ListItemText primary={item.title} />
									</ListItem>
								);
							}
							const isSubListSelected = item.children.some(
								({ to }: any) => pathname.includes(to),
							);
							return (
								<SubList
									title={item.title}
									key={item.title + String(item.to)}
									isMenuOpen={open}
									selected={isSubListSelected}
									icon={item.icon && <Icon>{item.icon}</Icon>}
									open={isSubListSelected}
								>
									{item.children.map((subItem: any) => (
										<ListItem
											button
											selected={pathname === subItem.to}
											key={subItem.title + subItem.to}
											component={Link as any}
											to={subItem.to}
										>
											{subItem.icon && (
												<ListItemIcon>
													<Icon>{subItem.icon}</Icon>
												</ListItemIcon>
											)}
											<ListItemText primary={subItem.title} />
										</ListItem>
									))}
								</SubList>
							);
						})}
					</List>
				</div>
			</Drawer>
		</ThemeProvider>
	);
};

export default injector(AppMenu);
