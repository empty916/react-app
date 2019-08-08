const { getArg, getPath } = require('./utils');

const { channel, project } = getArg();

module.exports = {
	dllPath: getPath('server', 'dll'),
	distPath: getPath('dist', channel, project),
};
