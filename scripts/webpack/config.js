const { getArg, getPath } = require('./utils');

const { channel, project, PROJECT_ENV } = getArg();

const publicPath = PROJECT_ENV === 'development' ? '/' : '/';

module.exports = {
	dllPath: getPath('scripts', 'dll'),
	distPath: getPath('dist', channel, project),
	publicPath,
	jsPublicPath: publicPath,
	cssPublicPath: publicPath,
	imgPublicPath: publicPath
};
