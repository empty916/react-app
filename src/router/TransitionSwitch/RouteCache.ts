import {Location} from 'history';

class RouteCache {
	cache: string[] = [];
	push(location: Location) {
		if (this.isRepeat(location)) {
			return;
		}
		if (!this.isBack(location)) {
			this.cache.push(location.pathname);
		}
		if (this.cache.length > 100) {
			this.cache.pop();
		}
	}
	isBack(location: Location) {
		const lastLocation = this.cache[this.cache.length - 2];
		return lastLocation === location.pathname;
	}
	isRepeat(location: Location) {
		return this.cache[this.cache.length - 1] === location.pathname;
	}
}

const routeCacheInstance = new RouteCache();

export default routeCacheInstance;
