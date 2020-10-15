// import theme from '@/service/theme';
import zhLang from '@/constants/common/lang/zh';
import enLang from '@/constants/common/lang/en';
import { ThunkParams } from 'natur/dist/middlewares';

const state = {
	name: 'app',
	lang: 'zh' as 'zh'|'en',
	isMenuOpen: true,
	menuData: [
		{
			icon: 'home',
			title: '首页',
			to: '/',
		},
		{
			icon: 'menu_book',
			title: 'PAGES',
			children: [
				{
					icon: 'airline_seat_flat_angled',
					title: 'page2',
					to: '/page2',
				},
				{
					icon: 'airline_seat_individual_suite',
					title: 'page3',
					to: '/page3',
				},
			],
		},
		{
			icon: 'supervisor_account',
			title: '用户管理',
			children: [
				{
					icon: 'person',
					title: '用户',
					to: '/user/list',
				},
			],
		},
	],
};

const actions = {
	update: (name: string) => ({name}),
	setLang: (lang: 'zh' | 'en') => ({lang}),
	openMenu: () => ({isMenuOpen: true}),
	closeMenu: () => ({isMenuOpen: false}),
	toggleMenu: () => ({getState}: ThunkParams<typeof state>) => ({isMenuOpen: !getState().isMenuOpen}),
};

const maps = {
	getLangData: ['lang', (lang: 'zh' | 'en') => {
		if (lang === 'zh') {
			return zhLang;
		}
		return enLang;
	}],
};



export default {
	state,
	maps,
	actions,
};

