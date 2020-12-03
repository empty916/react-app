import NaturService from '../natur-service';
import React from 'react';
import store from '@/store';


class ChannelService extends NaturService {
	get channel() {
		return this.store.getModule('channel');
	}

	/** 判断当前渠道是否包含某功能，功能配置在constants/channel中 */
	has(featureName: string) {
		return this.channel.maps.has(featureName);
	}

	/** 根据功能名称执行对应的方法，功能配置在constants/channel中 */
	featureSwitch(features: {[k: string]: Function}) {
		return this.channel.maps.switch(features);
	}
}

export const useChannel = () => {
	const unsubRef = React.useRef<Function>();
	const [channel, updateChannel] = React.useState(() => {
		unsubRef.current = () => store.subscribe('channel', () => updateChannel(store.getModule('channel')));
		return store.getModule('channel');
	});
	React.useEffect(() => () => {
		unsubRef.current && unsubRef.current();
	}, []);
	return {
		/** 判断当前渠道是否包含某功能，功能配置在constants/channel中 */
		has: channel.maps.has,
		/** 根据功能名称执行对应的方法，功能配置在constants/channel中 */
		featureSwitch: channel.maps.switch,
	};
};

const channelService = new ChannelService(store);

export default channelService;
