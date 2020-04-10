const { getArg, getPath } = require('./utils');

const { channel, project, PROJECT_ENV } = getArg();

const publicPath = PROJECT_ENV === 'development' ? '/' : '/admin';

module.exports = {
	dllPath: getPath('server', 'dll'),
	distPath: getPath('dist', channel, project),
	jsPublicPath: publicPath,
	cssPublicPath: publicPath,
	imgPublicPath: publicPath
};
