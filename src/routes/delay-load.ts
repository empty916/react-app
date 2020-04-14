
/**
 * 一个模块延迟加载的方法，当路由懒加载时，往往加载的很快，
 * 那么使用loading或者骨架屏时会一闪而过，很影响用户体验。
 * 所以用此方法，可以让懒加载模块在第一次加载时，最少等待一定的时间，然后再加载。
 */
export function createDelayLoad() {
	const promiseFuncMap = new Map();
	/**
     * @param p 一个返回promise的函数
     * @param time promise延迟返回时间
     */
	async function delayLoad<T>(p: () => Promise<T>, time: number = 1000): Promise<T> {
		if (promiseFuncMap.has(p)) {
			return p();
		}
		promiseFuncMap.set(p, true);
		const result = p();
		await new Promise(res => setTimeout(res, time));
		return result;
	}
	return delayLoad;
}


export default createDelayLoad();
