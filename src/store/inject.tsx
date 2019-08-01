import React, {
	useState,
	useContext,
	useMemo,
} from 'react';
import { StoreContext } from './createStore';


const Loading = () => 'loading';

const connect = (moduleName: string[], WrappedComponent: any) => {
	return (props: any) => {
		const state = useContext(StoreContext);
		const newProps = {...props};
		// TODO: 缓存计算moduleName对应的store、action,放入props中
		const render = useMemo(() => (
			<WrappedComponent {...newProps} />
		), Object.values(newProps));
		return render;
	}
}

const Inject = (moduleName: string[]) => {
	// TODO:动态加载moduleName中还未加载的模块

	return (WrappedComponent: React.Component<any, any, any> | React.FunctionComponent<any>) => {
		return connect(moduleName, WrappedComponent);
	}
}


