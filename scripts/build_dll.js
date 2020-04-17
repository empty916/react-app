// const rimraf = require('rimraf');
// const path = require('path');
const builder = require('./builder');
const createWebpackConfig = require('./webpack/webpack.dll.conf');

const devWebpackConfig = createWebpackConfig('development');
const prodWebpackConfig = createWebpackConfig('production');

builder(devWebpackConfig, 'development dll');
builder(prodWebpackConfig, 'production dll');
