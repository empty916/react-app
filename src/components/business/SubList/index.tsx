
import React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
// import {} from '@material-ui/core/styles';
import cls from 'classnames';
import { InjectStoreModule, inject } from 'natur';
import styles from './style.scss';

type SubListItemProps = {
	open: boolean,
	icon: React.ReactElement,
	title: React.ReactNode | string,
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	pl?: number,
	style?: any,
	selected?: boolean,
};

const _ListItem: any = ListItem;

const getName = (ele: any) => ele?.type?.displayName;
const isListItem = (ele: any): ele is React.ReactElement => React.isValidElement(ele) && (getName(ele) === _ListItem.displayName);

const SubList: React.FC<SubListItemProps & {app: InjectStoreModule}> = ({
	app,
	open: initOpen,
	icon,
	title,
	onClick,
	children,
	pl = 20,
	style,
	selected,
}) => {
	const [open, setOpen] = React.useState(initOpen);
	const {isMenuOpen} = app.state;
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
					root: styles['sub-list'],
					selected: styles['sub-list-selected'],
				}}
				button
				onClick={$onClick}
				style={style}
			>
				{icon && (
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
			<Collapse in={open && isMenuOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{
						React.Children.map(children, child => (isListItem(child) ? React.cloneElement(child as React.ReactElement, {
							style: {paddingLeft: pl},
						}) : child))
					}
				</List>
			</Collapse>
		</List>
	);
};

export default inject<{app: InjectStoreModule}>(['app', {state: ['isMenuOpen']}])(SubList);
