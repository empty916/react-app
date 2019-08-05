import React, {Component} from 'react';
import {store} from '@client/index';

// 管理员等级
// const ADMIN_LEVEL = 2;
// 超级管理员等级
const SUPER_ADMIN_LEVEL = 1;


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
	 * @returns {AuthorityFilterHOC}
	 * @constructor
	 */
	static createAuthorityFilterHOC(WrappedComponent) {
		class AuthorityFilterHOC extends Component {
			state = {
				hasAuth: false,
			};

			componentDidMount() {
				// 判断当前模块是否有权限
				this.setState({
					hasAuth: Authority.isCurrentUserHasAuth(this.props),
				});
			}

			componentDidUpdate() {
				const newHasAuth = Authority.isCurrentUserHasAuth(this.props);
				if (newHasAuth !== this.state.hasAuth) {
					this.setState({hasAuth: newHasAuth}); // eslint-disable-line
				}
			}

			render() {
				const {hasAuth} = this.state;
				const {...props} = this.props;
				delete props.auth;
				delete props.authLevel;
				delete props.authRole;
				return hasAuth ? <WrappedComponent {...props} /> : null;
			}
		}

		return AuthorityFilterHOC;
	}

	/**
	 * 判断用户是否有权限
	 * 根据用户的权限等级或者用户的权限列表判断，满足其一即可
	 * 用户的权限等级， 1级最大，2级次之，以此类推
	 * @param params: {
     *  authLevel: Num, 权限等级限制
     *  auth: string 权限名称
     *  role: string 用户角色
     *  }
	 * @returns {boolean}
	 */
	static isCurrentUserHasAuth(params) {
		const levelLimit = params.authLevel;
		const authLimit = params.auth;
		const { authRole: role } = params;

		const {userLevel, userAuths, userRole} = Authority.getCurrentUserAuthority();

		const needCheckAuth = Authority._isNeedCheckAuth(levelLimit, authLimit, role);
		if (!needCheckAuth) {
			return true;
		}
		// 用户角色是否被允许
		const userRoleIsPermit = Authority._userRoleIsPermit(userRole, role);
		// 用户权限是否被允许
		const userAuthIsValid = Authority._userAuthIsValid(userAuths, authLimit);
		// 用户等级是否被允许
		const userLevelIsPermit = Authority._userLevelIsPermit(userLevel, levelLimit);
		return userRoleIsPermit || userAuthIsValid || userLevelIsPermit;
	}

	/**
	 * 获取当前用户权限
	 * @returns {*}
	 */
	static getCurrentUserAuthority() {
		const { userStore } = store.getState().root;
		const currentUserAuth = {
			userLevel: userStore.userLevel,
			userAuths: userStore.userAuths,
			userRole: userStore.userRole,
		};
		return currentUserAuth;
	}

	// 判断该组件需不需要检查权限
	static _isNeedCheckAuth(levelLimit, authLimit, role) {
		if (levelLimit === undefined && !authLimit && !role) {
			return false;
		}
		return true;
	}

	// 用户是否拥有某个权限
	static _userAuthIsValid(userAuths, authLimit) {
		let isshow = false;
		if (Array.isArray(authLimit)) {
			isshow = authLimit.some(item => userAuths.includes(item));
		} else {
			isshow = userAuths.indexOf(authLimit) > -1;
		}
		return isshow;
	}

	// 用户的等级是否允许
	static _userLevelIsPermit(userLevel, levelLimit) {
		if (/^\d*$/.test(levelLimit)) {
			return userLevel <= levelLimit;
		}
		return userLevel === SUPER_ADMIN_LEVEL;
	}

	// 用户的角色是否允许
	static _userRoleIsPermit(userRole, role) {
		if (Array.isArray(role)) {
			return role.some(item => userRole.includes(item));
		}
		// return userRole === role;
		return userRole.includes(role);
	}
}

export default Authority;
