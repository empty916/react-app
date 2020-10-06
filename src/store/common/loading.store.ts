import { ThunkParams } from 'natur';

const createShowLoadingState = (oldState: State) => {
	const state = {...oldState};
	if (state.loadingCount <= 0) {
		state.showLoading = true;
		state.loadingCount = 0;
	}
	state.loadingCount += 1;
	return state;
};

const createHideLoadingState = (oldState: State) => {
	const state = {...oldState};
	state.loadingCount -= 1;
	if (state.loadingCount <= 0) {
		state.showLoading = false;
		state.loadingCount = 0;
	}
	return state;
};

const state = {
	loadingCount: 0,
	showLoading: false,
	loadingText: '加载中',
	loadingZIndex: 100,
};

type State = typeof state;

export default {
	state,
	actions: {
		show: () => ({getState}: ThunkParams<State>) => createShowLoadingState(getState()),
		hide: () => ({getState}: ThunkParams<State>) => createHideLoadingState(getState()),
		changeLoadingText: (loadingText: string) => ({loadingText}),
		changeLoadingZIndex: (loadingZIndex: number) => ({
			loadingZIndex,
		}),
	},
};
