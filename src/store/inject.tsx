import React, {
	useState,
	useContext,
	useMemo,
	useEffect,
	useRef,
} from 'react';
import { StoreContext, StoreModule } from './createStore';
import { store } from './index';
import { formatModuleName, shadowEqual } from './utils';
import { matchModule } from './getModuleNames';


const Loading = () => <div>loading</div>;

const createLoadModulesPromise = (moduleNames: string[]) => moduleNames.map(mn => {
	return import(`@client/pages/${mn}/index.ts`);
});

const connect = (moduleNames: string[], WrappedComponent: React.ComponentClass<any, any> | React.FC<any>): React.FC<any> => {
	return (props: any): JSX.Element => {
		let newProps = {...props};
		const state = useContext(StoreContext);
		// 根据用户传入的模块名字，匹配找到完整的模块名字
		const integralModulesName = moduleNames.map(matchModule).flatMap(mm => mm.matchedModulesName);
		// const matchedFormatModulesName = matchedModules.flatMap(mm => mm.matchedFormatModulesName);
		// TODO: 判断moduleNames中是否存在未加载的模块
		const unLoadedModules = integralModulesName.filter(mn => !store.hasModule(mn));
		const [modulesHasLoaded, setModulesHasLoaded] = useState(!unLoadedModules.length);

		useEffect(
			() => {
				// TODO: 动态加载moduleName中还未加载的模块
				if (!modulesHasLoaded) {
					const loadModulesPromise = createLoadModulesPromise(unLoadedModules);
					Promise.all(loadModulesPromise)
						.then((modules: StoreModule[]) => {
							modules.forEach((md, index) => store.addModule(unLoadedModules[index], md));
							setModulesHasLoaded(true);
						})
						.catch((e: Error) => {
							setModulesHasLoaded(false);
						});
				}
			},
			[]
		);
		// TODO: 计算moduleName对应的store、action,放入props中
		const injectModules = useMemo(
			() => {
				if (modulesHasLoaded) {
					return integralModulesName.reduce((res, mn: string) => ({
						...res,
						...store.getModule(mn),
					}), {});
				}
				return {};
			},
			[modulesHasLoaded, state]
		);
		newProps = {
			...newProps,
			...injectModules,
		};

		const render = useMemo(
			() => <WrappedComponent {...newProps} />,
			[props, injectModules]
		);

		return modulesHasLoaded ? render : <Loading />;
	}
}

const Inject = (...moduleNames: string[]) => {
	return (WrappedComponent: React.ComponentClass<any, any> | React.FC<any>) => {
		return connect(moduleNames, WrappedComponent);
	}
}
export default Inject;

