import React, { Component } from 'react';
import { AuthType } from '@/constants/common/Auth';
import copyStatic from 'hoist-non-react-statics';
import {inject, StoreType} from '@/store';

const authCheckType = (props: any): [string, AuthType][] => {
	const res:[string, AuthType][] = [];
	if (props.authLevel !== undefined) {
		res.push([props.authLevel, 'level']);
	}
	if (props.authRole !== undefined) {
		res.push([props.authRole, 'role']);
	}
	if (props.auth !== undefined) {
		res.push([props.auth, 'auth']);
	}
	if (res.length === 0) {
		res.push([props.auth, 'auth']);
	}
	return res;
};


type AuthProps = {
	auth?: string;
	authLevel?: string;
	authRole?: string;
};

type Ref = {
	forwardRef?: any,
}

type UserStoreModule = Pick<StoreType, 'user'>;

type AuthFilterProps<T> = T & AuthProps & Ref & UserStoreModule;

/**
 * 创建权限过滤器高阶组件
 * 控制需要权限验证模块的权限验证，
 * 如果用户有权限就显示该模块，
 * 没有就不显示。
 * @param {React.ComponentClass<T> | React.FC<T>} WrappedComponent 需要控制权限的组件
 * @returns {Component} 封装后的组件，可以通过权限属性控制组件显隐
 *
 */
function AuthFilterHOC<T, U extends AuthFilterProps<T> = AuthFilterProps<T>>(WrappedComponent: React.ComponentClass<T> | React.FC<T>) {
	class AuthFilter extends Component<U> {
		render() {
			const { auth, authLevel, authRole, forwardRef, user, ...props } = this.props;
			const checkTypes = authCheckType({auth, authLevel, authRole});
			const authIsValid = checkTypes.some(ct => user.maps.hasAuth(...ct));
			if (forwardRef) {
				(props as any).ref = forwardRef;
			}
			if (authIsValid) {
				return <WrappedComponent {...(props as T)} />;
			}
			return null;
		}
	}
	let RefAuthFilter = AuthFilter;
	if (typeof (WrappedComponent as any).render === 'function') {
		RefAuthFilter = React.forwardRef((props, ref) => {
			const newProps: any = {
				...props,
				forwardRef: ref,
			};
			return <AuthFilter {...newProps} />;
		}) as any;
	}
	RefAuthFilter = copyStatic(RefAuthFilter, WrappedComponent);
	return inject(['user', {maps: ['hasAuth']}])(RefAuthFilter as React.ComponentClass<U>);
}

export default AuthFilterHOC;
