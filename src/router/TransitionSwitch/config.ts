import { spring as _spring, presets } from 'react-motion';

type TPosition = 'relative'|'absolute'|'static';

const styleMap = (s: any) => {
	if (s.left === 0) {
		return {
			transform: `translate(${s.left}%, 0)`,
			zIndex: s.zIndex,
			position: 'static' as TPosition,
		};
	};
	return {
		transform: `translate(${s.left}%, 0)`,
		zIndex: s.zIndex,
		position: 'absolute' as TPosition,
	};
};

const spring = (num: number) => _spring(num, presets.noWobble);

const forward = {
	defaultStyles: {
		left: 100,
		zIndex: 1,
	},
	willEnter: () => ({
		left: 100,
		zIndex: 1,
	}),
	styles: {
		left: spring(0),
		zIndex: 1,
	},
	willLeave: () => ({
		left: spring(-100),
		zIndex: 0,
	}),
};

const back = {
	defaultStyles: {
		left: -100,
		zIndex: 1,
	},
	willEnter: () => ({
		left: -100,
		zIndex: 1,
	}),
	styles: {
		left: spring(0),
		zIndex: 1,
	},
	willLeave: () => ({
		left: spring(100),
		zIndex: 0,
	}),
};


export default {
	forward,
	back,
	styleMap,
}
