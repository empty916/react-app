/* eslint-disable */
import React, { Component } from "react";
import { hasAuth } from "@/service/user";
import { type } from "@/constants/Auth";
import copyStatic from 'hoist-non-react-statics';
import { inject } from "natur";

const authCheckType = (props: any): [string, type] => {
	if (props.authLevel !== undefined) {
		return [props.authLevel, "level"];
	}
	if (props.authRole !== undefined) {
		return [props.authRole, "role"];
	}
	return [props.auth, "auth"];
};

/**
 * 权限模块
 */
class Authority {
	/**
	 * 创建权限过滤器高阶组件
	 * 控制需要权限验证模块的权限验证，
	 * 如果用户有权限就显示该模块，
	 * 没有就不显示。
	 * @param WrappedComponent 需要控制权限的组件
	 * @returns {AuthFilter}
	 * @constructor
	 */
	static createAuthFilterHOC(WrappedComponent: React.ComponentClass | React.FC) {
		class AuthFilter extends Component<any> {
			render() {
				const { auth, authLevel, authRole, ...props } = this.props;
				const authIsValid = hasAuth(...authCheckType({auth, authLevel, authRole}));
				if (authIsValid) {
					return <WrappedComponent {...props} />;
				}
				return null;
			}
		}
		return inject(['user', {maps: ['hasAuth']}])(copyStatic(AuthFilter, WrappedComponent));
	}
}

export default Authority;
