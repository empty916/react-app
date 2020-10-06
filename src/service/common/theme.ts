import curry from 'lodash/curry';
import clone from 'lodash/cloneDeep';
// import { curry, cloneDeep as clone } from 'lodash';
import cstThemeConfig from '@/theme/native/config';

type IThemeConfig = {
	[propName: string]: string;
};

class Theme {
	private themeConfig: IThemeConfig = {};

	private themeDom: HTMLElement | null;

	private themeTextBackup: string = '';

	constructor(selector: string, themeConfig: IThemeConfig) {
		this.themeDom = document.querySelector(selector);
		if (this.themeDom) {
			this.themeTextBackup = this.themeDom.innerHTML;
		}
		this.themeConfig = clone(themeConfig);
		this.syncTheme();
	}

	// 根据主题配置，同步主题
	private syncTheme() {
		if (!this.themeDom) {
			return;
		}
		const themeStyleText = Object.keys(this.themeConfig).reduce(
			(styleText, key) => styleText.replace(key, this.themeConfig[key]),
			this.themeTextBackup,
		);
		this.themeDom.innerHTML = themeStyleText;
	}

	changeColor(oldColor: string, newColor: string) {
		if (oldColor === newColor) {
			return;
		}
		Object.keys(this.themeConfig).forEach(key => {
			if (this.themeConfig[key] === oldColor) {
				this.themeConfig[key] = newColor;
			}
		});
		this.syncTheme();
	}

	set(prop: string, value: string) {
		if (this.themeConfig[prop] === undefined) {
			throw new Error(`主题配置中没有${prop}属性！`);
		}
		if (this.themeConfig[prop] === value) {
			return;
		}
		this.themeConfig[prop] = value;
		this.syncTheme();
	}

	resetConfig(themeConfig: IThemeConfig) {
		this.themeConfig = themeConfig;
		this.syncTheme();
	}
}

let themeInstance: Theme | null = null;
const createTheme = curry((selector: string, themeConfig: IThemeConfig) => {
	if (themeInstance === null) {
		themeInstance = new Theme(selector, themeConfig);
	}
	return themeInstance;
});

export default createTheme('#theme-css', cstThemeConfig);
