import React, {
	useRef,
	useState,
	useMemo,
	useEffect,
	useCallback,
} from 'react';
import hoistStatics from 'hoist-non-react-statics'
import { StoreModule } from './createStore';
import store from './index';
import isEqualWithDepthLimit from './isEqualWithDepthLimit';


const Loading = () => <div>loading</div>;

const createLoadModulesPromise = (moduleNames: string[]) => moduleNames.map((mn: string) => store.getLazyModule(mn)());

const connect = (moduleNames: string[], WrappedComponent: React.ComponentClass<any, any> | React.FC<any>): React.FC<any> => {
	const allModuleNames = store.getAllModuleName();
	const integralModulesName = moduleNames.filter(mn => allModuleNames.includes(mn));

	if (!integralModulesName.length) {
		console.warn(`modules: ${moduleNames.join()} is not exits!`);
		console.warn(`${moduleNames.join()} 模块不存在!`);
		return WrappedComponent as React.FC<any>;
	}

	let Connect: React.FC<any> = ({forwardedRef, ...props}: any) => {
		// const s = performance.now();
		let newProps = {...props};
		const [stateChanged, setStateChanged] = useState({});
		// 获取store中存在的模块
		// const matchedFormatModulesName = matchedModules.flatMap(mm => mm.matchedFormatModulesName);
		// TODO: 判断moduleNames中是否存在未加载的模块
		const unLoadedModules = integralModulesName.filter(mn => !store.hasModule(mn));
		const [modulesHasLoaded, setModulesHasLoaded] = useState(!unLoadedModules.length);
		const $setStateChanged = useCallback(() => setStateChanged({}), [setStateChanged]);
		// console.log(a);
		useEffect(() => {
			const unsubscribes = integralModulesName.map(mn => store.subscribe(mn, $setStateChanged));
			return () => unsubscribes.forEach(fn => fn());
		}, []);

		useEffect(
			() => {
				// TODO: 动态加载moduleName中还未加载的模块
				if (!modulesHasLoaded) {
					const loadModulesPromise = createLoadModulesPromise(unLoadedModules);
					Promise.all(loadModulesPromise)
						.then((modules: StoreModule[]) => {
							modules.forEach(({state, actions, maps}, index) =>
								store.addModule(unLoadedModules[index], {state: {...state}, actions, maps})
							);
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
						[mn]: store.getModule(mn),
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
				/**
				 * why depth is 3?
				 * because the router props will be:
				 * props: {
				 * 		// depth: 1
				 * 		match: {
				 * 			// depth: 2
				 * 			params: { // and this one will be change every times;
				 * 				// depth: 3,
				 * 			},
				 * 		}
				 * }
				 */
				const propsChanged = !isEqualWithDepthLimit($props.current, props, 3);
				if (propsChanged) {
					$props.current = props;
				}
				return $props.current;
			},
			[props]
		)
		const stabelInjectModules = useMemo(
			() => {
				const injectModulesChanged = !isEqualWithDepthLimit($injectModules.current, injectModules, 2);
				if (injectModulesChanged) {
					$injectModules.current = injectModules;
				}
				return $injectModules.current
			},
			[injectModules]
		)
		const render = useMemo(
			() => <WrappedComponent {...newProps} ref={forwardedRef} />,
			// [props, injectModules]
			[stabelProps, stabelInjectModules]
		);
		// console.log(performance.now() - s);
		return modulesHasLoaded ? render : <Loading />;
	};
	Connect = React.memo(Connect);
	Connect.displayName = 'Connect';
	const forwardedConnect = React.forwardRef((props, ref) => <Connect {...props} forwardedRef={ref} />);

	forwardedConnect.displayName = 'forwardedConnect';
	// (forwardedConnect as any).WrappedComponent = WrappedComponent;
	return hoistStatics(forwardedConnect, WrappedComponent);
}

const Inject = (...moduleNames: string[]) => {
	return (WrappedComponent: React.ComponentClass<any, any> | React.FC<any>) => connect(moduleNames, WrappedComponent);
}
export default Inject;

