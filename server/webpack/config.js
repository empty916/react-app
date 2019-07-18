const { getArg, getPath } = require('./utils');

const { site, project } = getArg();

module.exports = {
    dllPath: getPath('server', 'dll'),
    distPath: getPath('dist', site, project),
}