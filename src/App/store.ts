// import theme from '@/service/theme';
import zhLang from '@/constants/lang/zh';
import enLang from '@/constants/lang/en';
import { MiddlewareParams } from 'natur';

const state = {
	name: 'app',
	lang: 'zh',
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
					icon: 'airline_seat_flat',
					title: 'page1',
					to: '/page1',
				},
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
	toggleMenu: () => ({getState}: MiddlewareParams) => ({isMenuOpen: !getState().isMenuOpen}),
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
