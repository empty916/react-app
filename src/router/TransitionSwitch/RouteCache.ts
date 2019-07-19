import {Location} from 'history';


class RouteCache {
	cache: string[] = [];
	currentIndex:number = -1;
	constructor() {
		this.clearHistory();
	}
	clearHistory() {
		// 项目初始化，清除history记录
		if (!!history.pushState){
			history.pushState(null, '', location.href);
		}
	}
	push(location: Location) {
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
}

const routeCacheInstance = new RouteCache();

export default routeCacheInstance;
