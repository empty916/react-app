class LoadingController {
	loadingCount = 0;

	init = ({ showLoading, hideLoading }) => {
		this._showLoading = showLoading;
		this._hideLoading = hideLoading;
	};

	showLoading = () => {
		if (this.loadingCount <= 0 && this._showLoading) {
			this._showLoading();
			this.loadingCount = 0;
		}
		this.loadingCount += 1;
	};

	hideLoading = () => {
		this.loadingCount -= 1;
		if (this.loadingCount <= 0 && this._hideLoading) {
			this._hideLoading();
			this.loadingCount = 0;
		}
	};
}

const loadingController = new LoadingController();
export default loadingController;
