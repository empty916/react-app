import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Paper,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Box,
	Grid,
	Collapse,
} from '@material-ui/core';
import {
	ThemeProvider,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import materialTheme from '@/service/theme/material';
import clsx from 'classnames';
import AuthRoute from '@/routes/AuthRoute';
import { useInject } from 'natur';
import Button from '@/components/base/Button';
import Input from '@/components/base/Input';
import routes, { Index } from '@/routes';
import '@/theme/test.scss';
import './style.scss';
import IconButton from '@/components/base/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import StarBorder from '@material-ui/icons/StarBorder';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'flex',
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
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
		width: theme.spacing(7) + 1,
	},
}));

const App: React.FC = () => {
	const [{ state, actions }] = useInject('user');
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleDrawer = () => {
		setOpen(!open);
	};
	return (
		<ThemeProvider theme={materialTheme}>
			<CssBaseline />
			<Grid container>
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
					<Divider />
					<List>
						<ListItem button>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary='Inbox' />
						</ListItem>
						<ListItem button selected>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary='Starred' />
						</ListItem>
						<Collapse in timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button selected style={{paddingLeft: 20}}>
									<ListItemIcon>
										<StarBorder />
									</ListItemIcon>
									<ListItemText primary="Starred" />
								</ListItem>
							</List>
						</Collapse>
					</List>
				</Drawer>
				<Grid item style={{flex: 1}}>
					<AppBar position="static">
						<Toolbar>
							<IconButton edge="start" onClick={handleDrawer} color="inherit" aria-label="menu">
								<Menu />
							</IconButton>
							<Typography variant="h6">News</Typography>
							<Button color="inherit">Login</Button>
						</Toolbar>
					</AppBar>
					<Link to="/page1">page1</Link>
					<Link to="/page2">page2</Link>
					<Link
						to={{
							pathname: '/page3',
							search: '?id=1',
						}}
					>
						page3
					</Link>
					<br />
					<Input
						style={{ width: 200 }}
						type="text"
						value={state.name}
						onChange={actions.updateName}
					/>
					<Button variant="contained" color="primary" auth="">
						test
					</Button>
					<Switch>
						{routes.map((route: any) => (
							<AuthRoute key={route.path || route.key} {...route} />
						))}
						<Route component={Index} />
					</Switch>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

// export default inject<Props>('app')(App);
export default App;
