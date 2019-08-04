const builder = require('./builder');
const prodWebpackConfig = require('./webpack/webpack.prod.conf');
const autoGetModule = require('./autoGetModule');

autoGetModule();
builder(prodWebpackConfig, 'production package');
