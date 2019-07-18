import {Location} from 'history';

class RouteCache {
	cache: string[] = [];
	currentIndex:number = -1;
	push(location: Location) {
		if (!this.isBack(location)) {
			if (this.currentIndex === this.cache.length - 1) {
				this.currentIndex++;
				this.cache.push(location.pathname);
			} else {
				this.currentIndex++;
				this.cache[this.currentIndex] = location.pathname;
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
