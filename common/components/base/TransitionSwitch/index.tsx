import React, {
	ReactChildren,
	useCallback,
	useContext,
	useMemo,
 } from 'react';
import {
	matchPath,
	SwitchProps,
	__RouterContext as RouterContext,
} from 'react-router';

import {
	TransitionMotion,
	TransitionProps,
	TransitionStyle,
	PlainStyle,
	Style,
} from 'react-motion';
import routeCacheInstance from './RouteCache';
import defaultMotionConfig from './config';
import css from './style.scss';

const { forward, back, styleMap: dfStyleMap } = defaultMotionConfig;
const isEmptyChildren = (children: ReactChildren) =>
	React.Children.count(children) === 0;

type TStyleMap = (p: Style | PlainStyle) => React.CSSProperties;
interface ITransitionProps {
	defaultStyles?: PlainStyle;
	styles: Style;
	willEnter?: TransitionProps['willEnter'];
	willLeave?: TransitionProps['willLeave'];
	didLeave?: TransitionProps['didLeave'];
}
interface ITransitionSwitchProps extends SwitchProps {
	styleMap?: TStyleMap;
	forward?: ITransitionProps;
	back?: ITransitionProps;
}

const TransitionSwitch: React.FunctionComponent = (props: ITransitionSwitchProps) => {
	const context = useContext(RouterContext);
	const location = useMemo(
		() => props.location || context.location,
		[props.location, context]
	)
	const motionConfig = useMemo(
		(): ITransitionProps => {
			routeCacheInstance.push(location);
			if (routeCacheInstance.isBack(location)) {
				routeCacheInstance.resetCurrent(location);
				return props.back || back;
			}
			return props.forward || forward;
		},
		[location, props]
	)
	const renderRoute = useMemo(
		() => {
			const { children } = props;
			let match: any, child: any;
			React.Children.forEach(children, element => {
				if (match == null && React.isValidElement(element)) {
					const {
						path: pathProp,
						exact,
						strict,
						sensitive,
						from,
					} = element.props;
					const path = pathProp || from;

					child = element;
					match = matchPath(
						location.pathname,
						{ path, exact, strict, sensitive },
						context.match,
					);
				}
			});
			// this.renderRoute = { match, child };
			return { match, child };
		},
		[location, props.children]
	)
	const path = useMemo(
		() => {
			const { child } = renderRoute;
			if (child) {
				return child.props.path;
			}
			return location.pathname;
		},
		[location, renderRoute]
	)
	const renderComponent = useMemo(
		() =>  {
			const { history, staticContext } = (context as any);
			const { match, child } = renderRoute;
			const props = { match, location, history, staticContext };
			const { component, render, children } = child.props;

			if (component)
				return match ? React.createElement(component, props) : null;
			if (render) return match ? render(props) : null;

			if (typeof children === 'function') return children(props);

			if (children && !isEmptyChildren(children))
				return React.Children.only(children);
			return null;
		},
		[context, renderRoute]
	)
	const defaultStyles = useMemo(
		() => {
			const { defaultStyles } = motionConfig;
			if (defaultStyles === undefined) {
				return [];
			}
			const { match } = renderRoute;
			if (match) {
				return [
					{
						key: path,
						style: defaultStyles,
						data: renderComponent,
					},
				];
			} else {
				return [];
			}
		},
		[motionConfig, renderRoute]
	)
	const styleMap = useCallback(
		(props.styleMap || dfStyleMap),
		[props.styleMap]
	)
	const renderTransition = useCallback(
		(styles: TransitionStyle[]) => {
			return (
				<div className={css['transition-wrapper']}>
					{styles.map(({ key, data, style }) => (
						<div
							key={key}
							style={styleMap((style as any))}
							className={css['box']}
						>
							{data}
						</div>
					))}
				</div>
			);
		},
		[styleMap]
	)
	const willEnter = useMemo(() => motionConfig.willEnter, [motionConfig]);
	const styles = useMemo(
		() => {
			const { styles } = motionConfig;
			const { match } = renderRoute;
			if (match) {
				return [
					{
						key: path,
						style: styles,
						data: renderComponent,
					},
				];
			} else {
				return [];
			}
		},
		[motionConfig, renderRoute, path, renderComponent]
	)
	const willLeave = useMemo(
		() => motionConfig.willLeave,
		[motionConfig]
	);
	const render = useMemo(
		() => {
			return (
				<TransitionMotion
					defaultStyles={defaultStyles}
					willEnter={willEnter}
					styles={styles}
					willLeave={willLeave}
				>
					{renderTransition}
				</TransitionMotion>
			);
		},
		[defaultStyles, willEnter, styles, willLeave, renderTransition]
	)
	return render;
}
export default TransitionSwitch;
