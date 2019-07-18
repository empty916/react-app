const builder = require('./builder');
const prodWebpackConfig = require('./webpack/webpack.prod.conf');

builder(prodWebpackConfig, 'production package');
