const { getArg, getPath } = require('./utils');

const { channel, project } = getArg();

const publicPath = '/';

module.exports = {
	dllPath: getPath('server', 'dll'),
	distPath: getPath('dist', channel, project),
	jsPublicPath: publicPath,
	cssPublicPath: publicPath,
	imgPublicPath: publicPath
};
