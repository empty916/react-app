import theme from '@/service/theme';

const update = (appName: string) => {
	theme.set('cardBgColor', 'red');
	return {name: appName};
};

export default {
	update,
};
