import React, { ReactChildren } from 'react';
import {
	matchPath,
	SwitchProps,
	RouteComponentProps,
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

const { forward, back, styleMap } = defaultMotionConfig;
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
interface TransitionSwitchProps extends SwitchProps {
	styleMap: TStyleMap;
	forward: ITransitionProps;
	back: ITransitionProps;
}

class TransitionSwitch extends React.Component<TransitionSwitchProps> {
	static defaultProps = {
		forward,
		back,
		styleMap,
	}
	renderTransition = (styles: TransitionStyle[]) => {
		return (
			<div className={css['transition-wrapper']}>
				{styles.map(({ key, data, style }) => (
					<div
						key={key}
						style={this.styleMap((style as any))}
						className={css['box']}
					>
						{data}
					</div>
				))}
			</div>
		);
	}
	render() {
		return (
			<RouterContext.Consumer>
				{context => {
					return (
						<TransitionMotion
							defaultStyles={this.getDefaultStyles(context)}
							willEnter={this.willEnter(context)}
							styles={this.getStyles(context)}
							willLeave={this.willLeave(context)}
						>
							{this.renderTransition}
						</TransitionMotion>
					);
				}}
			</RouterContext.Consumer>
		);
	}
	getMotionConfig(context: RouteComponentProps): ITransitionProps {
		const location = this.getLocation(context);
		routeCacheInstance.push(location);

		if (routeCacheInstance.isBack(location)) {
			// this.motionConfig = this.props.back;
			return this.props.back;
		}
		// this.motionConfig = this.props.forward;
		return this.props.forward;
		// return this.motionConfig;
	}
	getRenderRoute(context: RouteComponentProps) {
		const { children } = this.props;
		const location = this.getLocation(context);
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
	}
	getRenderComponent(context: RouteComponentProps) {
		const { history, staticContext } = (context as any);
		const location = this.getLocation(context);

		const { match, child } = this.getRenderRoute(context);

		const props = { match, location, history, staticContext };

		const { component, render, children } = child.props;

		if (component)
			return match ? React.createElement(component, props) : null;

		if (render) return match ? render(props) : null;

		if (typeof children === 'function') return children(props);

		if (children && !isEmptyChildren(children))
			return React.Children.only(children);
		return null;
	}
	styleMap(style: any) {
		return this.props.styleMap(style);
	}
	getPath(context: RouteComponentProps) {
		const location = this.getLocation(context);
		const { child } = this.getRenderRoute(context);
		if (child) {
			return child.props.path;
		}
		return location.pathname;
	}
	getLocation(context: RouteComponentProps) {
		return this.props.location || context.location;
	}
	getDefaultStyles(context: RouteComponentProps) {
		const { defaultStyles } = this.getMotionConfig(context);
		if (defaultStyles === undefined) {
			return [];
		}
		const { match } = this.getRenderRoute(context);
		if (match) {
			return [
				{
					key: this.getPath(context),
					style: defaultStyles,
					data: this.getRenderComponent(context),
				},
			];
		} else {
			return [];
		}
	}
	willEnter(context: RouteComponentProps) {
		return this.getMotionConfig(context).willEnter;
	}
	getStyles(context: RouteComponentProps) {
		const { styles } = this.getMotionConfig(context);
		const { match } = this.getRenderRoute(context);
		if (match) {
			return [
				{
					key: this.getPath(context),
					style: styles,
					data: this.getRenderComponent(context),
				},
			];
		} else {
			return [];
		}
	}
	willLeave(context: RouteComponentProps) {
		return this.getMotionConfig(context).willLeave;
	}
}

export default TransitionSwitch;
