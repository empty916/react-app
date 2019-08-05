import {Location} from 'history';

/**
 * 仿造浏览器前进后退的机制，实现一个路由缓存，
 * 用来控制页面的过渡效果，应该是前进还是后退。
 */
class RouteCache {
	cache: string[] = [];
	currentIndex:number = -1;
	constructor() {
		this.clearHistory();
	}
	clearHistory() {
		// 项目初始化，清除history记录
		// 窒息操作。
		if (!!history.pushState){
			for(let i = 0; i < 50; i++) {
				history.pushState(null, '', location.href);
			}
		}
	}
	push(location: Location) {
		/**
		 * 是否重复进入一个页面，这个其实比较鸡肋，
		 * 因为在调用层（transitionSwitch）,使用了useMemo缓存，
		 * 如果location不变是不会调用push方法。
		 */
		// if (this.isRepeat(location)) {
		// 	return;
		// }
		if (!this.isBack(location)) {
			if (this.currentIndex === this.cache.length - 1) {
				this.currentIndex++;
				this.cache.push(location.pathname);
			} else {
				this.currentIndex++;
				if (this.cache[this.currentIndex] !== location.pathname) {
					this.cache[this.currentIndex] = location.pathname
					this.cache = this.cache.slice(0, this.currentIndex + 1);
				}
				// this.cache[this.currentIndex] = location.pathname;
			}
		}
		if (this.cache.length > 100) {
			this.cache.pop();
		}
	}
	isBack(location: Location) {
		const lastLocation = this.cache[this.currentIndex - 1];
		return lastLocation === location.pathname;
	}
	resetCurrent(location: Location) {
		const index = this.cache.lastIndexOf(location.pathname);
		this.currentIndex = index;
	}
	// 判断是否会进入同一个页面。
	private isRepeat(location: Location) {
		// 如果当前路由指针在路由缓存的末端
		if(this.currentIndex === this.cache.length - 1) {
			return this.cache[this.currentIndex] === location.pathname;
		}
		return false;
	}
}

const routeCacheInstance = new RouteCache();

export default routeCacheInstance;
