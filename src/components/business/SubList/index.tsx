
import React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpandLess } from '@material-ui/icons';
// import {} from '@material-ui/core/styles';
import cls from 'classnames';
import styles from './style.scss';

type SubListItemProps = {
	open: boolean,
	icon: React.ReactElement,
	title: React.ReactNode | string,
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	isMenuOpen: boolean,
	pl?: number,
	style?: any,
	selected?: boolean,
};

const useStyle = makeStyles(theme => ({
	subList: {
		'&:hover': {
			backgroundColor: `${theme.palette.action.hover}!important`,
			boxShadow: 'none !important',
		},
	},
	subListSelected: {
		backgroundColor: `${theme.palette.action.hover}!important`,
		boxShadow: 'none !important',
	},
}));

const _ListItem: any = ListItem;

const getName = (ele: any) => ele?.type?.displayName;
const isListItem = (ele: any): ele is React.ReactElement => React.isValidElement(ele) && (getName(ele) === _ListItem.displayName);

const SubList: React.FC<SubListItemProps> = ({
	open: initOpen,
	icon,
	title,
	onClick,
	children,
	pl = 30,
	style,
	selected,
	isMenuOpen,
}) => {
	const [open, setOpen] = React.useState(initOpen);
	const classes = useStyle();
	const theme = useTheme();
	React.useEffect(() => {
		if (selected) {
			setOpen(true);
		}
	}, [selected]);
	const $onClick = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		setOpen(!open);
		if (onClick) {
			onClick(event);
		}
	}, [open, onClick]);
	return (
		<List disablePadding>
			<ListItem
				selected={selected}
				classes={{
					root: classes.subList,
					selected: classes.subListSelected,
				}}
				button
				onClick={$onClick}
				style={style}
			>
				{!!icon && (
					<ListItemIcon>
						{icon}
					</ListItemIcon>
				)}
				<ListItemText>
					{title}
				</ListItemText>
				<ExpandLess className={cls(styles['upper-arrow'], {
					[styles['down-arrow']]: open,
				})}
				/>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{
						React.Children.map(children, child => (isListItem(child) ? React.cloneElement(child as React.ReactElement, {
							style: {paddingLeft: isMenuOpen ? pl : (theme.overrides?.MuiListItem?.gutters as any).paddingLeft},
						}) : child))
					}
				</List>
			</Collapse>
		</List>
	);
};

export default SubList;
