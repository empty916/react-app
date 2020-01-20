import theme from '../business/theme';

const update = (appName: string) => {
	theme.set('cardBgColor', 'red');
	return {name: appName};
};

export default {
	update,
};
