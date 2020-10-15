import { CHANNEL_FEATURE_CONFIG, CHANNEL_NAME } from '@/constants/common/channel';

type CHANNEL_NAME_KEYS = keyof typeof CHANNEL_NAME;

const has = (channelName: CHANNEL_NAME_KEYS) => (featureName: string) => {
	const channelFeatures = CHANNEL_FEATURE_CONFIG[channelName];
	if (/^!/.test(featureName)) {
		return (
			!channelFeatures
				|| !channelFeatures.includes(featureName.slice(1))
		);
	}
	return channelFeatures && channelFeatures.includes(featureName);
};

const channelStore = {
	state: {
		channelName: CHANNEL_NAME.PLATFORM,
	},
	actions: {
		updateChannel: (channelName: CHANNEL_NAME_KEYS) => {
			if (CHANNEL_NAME[channelName] === undefined) {
				throw new Error('feature updateChannel: 无效的channelId!');
			}
			return {
				channelName,
			};
		},
	},
	maps: {
		has: ['channelName', has],
		switch: [
			'channelName',
			(channelName: CHANNEL_NAME_KEYS) => {
				const hasFeature = has(channelName);
				return (features: {[k: string]: Function}) => Object.keys(features).forEach(
					featureName => hasFeature(featureName) && features[featureName](),
				);
			},
		],
	},
};

export default channelStore;
