import { spring as _spring, presets } from 'react-motion';

type TPosition = 'relative'|'absolute'|'static';

const styleMap = (s: any) => {
	const { left, ...rest } = s;
	if (left === 0) {
		return {
			transform: `translate(${left}%, 0)`,
			position: 'static' as TPosition,
			...rest,
		};
	};
	return {
		transform: `translate(${left}%, 0)`,
		position: 'absolute' as TPosition,
		...rest,
	};
};

const spring = (num: number) => _spring(num, presets.noWobble);

const forward = {
	defaultStyles: {
		left: 50,
		opacity: 0,
		zIndex: 1,
	},
	willEnter: () => ({
		left: 50,
		opacity: 0,
		zIndex: 1,
	}),
	styles: {
		left: spring(0),
		opacity: spring(1),
		zIndex: 1,
	},
	willLeave: () => ({
		left: spring(-50),
		opacity: spring(0),
		zIndex: 0,
	}),
};

const back = {
	defaultStyles: {
		left: -50,
		opacity: 0,
		zIndex: 1,
	},
	willEnter: () => ({
		left: -50,
		opacity: 0,
		zIndex: 1,
	}),
	styles: {
		left: spring(0),
		opacity: spring(1),
		zIndex: 1,
	},
	willLeave: () => ({
		left: spring(50),
		opacity: spring(0),
		zIndex: 0,
	}),
};


export default {
	forward,
	back,
	styleMap,
}
