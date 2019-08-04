import React, {
	useState,
	useContext,
	useMemo,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import hoistStatics from 'hoist-non-react-statics'
import { StoreModule } from './createStore';
import store from './index';
import { formatModuleName, shadowEqual } from './utils';
import { matchModule, allModules } from './getModuleNames';


const Loading = () => <div>loading</div>;

const createLoadModulesPromise = (moduleNames: string[]) => moduleNames.map(mn => {
	return allModules.modules[formatModuleName(mn)]();
});

const connect = (moduleNames: string[], WrappedComponent: React.ComponentClass<any, any> | React.FC<any>): React.FC<any> => {
	let Connect: React.FC<any> = ({forwardedRef, ...props}: any) => {
		let newProps = {...props};
		const [stateChanged, setStateChanged] = useState(`${Date.now()}`);
		// 根据用户传入的模块名字，匹配找到完整的模块名字
		const integralModulesName = moduleNames.map(matchModule).flatMap(mm => mm.matchedModulesName);
		// const matchedFormatModulesName = matchedModules.flatMap(mm => mm.matchedFormatModulesName);
		// TODO: 判断moduleNames中是否存在未加载的模块
		const unLoadedModules = integralModulesName.filter(mn => !store.hasModule(mn));
		const [modulesHasLoaded, setModulesHasLoaded] = useState(!unLoadedModules.length);
		const $setStateChanged = useCallback(() => setStateChanged(`${Date.now()}-${Math.random()}`), [setStateChanged]);
		// console.log(a);
		useEffect(() => {
			const unsubs = integralModulesName.map(mn => store.subscribe(mn, $setStateChanged));
			return () => unsubs.forEach(us => us());
		}, []);

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
			[modulesHasLoaded, stateChanged]
		);
		newProps = {
			...newProps,
			...injectModules,
		};
		const $props = useRef(props);
		const $injectModules = useRef(injectModules);
		const stabelProps = useMemo(
			() => {
				const propsChanged = !shadowEqual($props.current, props);
				if (propsChanged) {
					$props.current = props;
				}
				return $props.current
			},
			[props]
		)
		const stabelInjectModules = useMemo(
			() => {
				const injectModulesChanged = !shadowEqual($injectModules.current, injectModules);
				if (injectModulesChanged) {
					$injectModules.current = injectModules;
				}
				return $injectModules.current
			},
			[injectModules]
		)
		const render = useMemo(
			() => <WrappedComponent {...newProps} ref={forwardedRef} />,
			[stabelProps, stabelInjectModules]
		);
		return modulesHasLoaded ? render : <Loading />;
	};
	Connect = React.memo(Connect);
	Connect.displayName = 'Connect';
	const forwardedConnect = React.forwardRef((props, ref) => <Connect {...props} forwardedRef={ref} />);

	forwardedConnect.displayName = 'forwardedConnect';
	// (forwardedConnect as any).WrappedComponent = WrappedComponent;
	return hoistStatics(forwardedConnect, WrappedComponent)

}

const Inject = (...moduleNames: string[]) => {
	return (WrappedComponent: React.ComponentClass<any, any> | React.FC<any>) => {
		return connect(moduleNames, WrappedComponent);
	}
}
export default Inject;

