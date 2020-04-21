const builder = require('./builder');
const prodWebpackConfig = require('./webpack/webpack.prod.conf');
const devWebpackConfig = require('./webpack/webpack.dev.conf');
const autoGetModule = require('./auto-get-module');

const isProd = process.env.NODE_ENV === 'production';

autoGetModule();
if (isProd) {
    builder(prodWebpackConfig, 'production package');
} else {
    builder(devWebpackConfig, 'development package');
}
