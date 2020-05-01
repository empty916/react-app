// https://github.com/shelljs/shelljs
'use strict'

require('shelljs/global')

const ora = require('ora')  //在执行脚本的过程中，用于在终端中显示一个类似loading的标记
const chalk = require('chalk')  //用于在终端中显示彩色文字
// const fs = require('fs')
// const path = require('path')
// const merge = require('webpack-merge') //深拷贝对象
// const rimraf = require('rimraf') //用于删除文件和文件夹
const {getArg} = require('./webpack/utils');
// const {distPath} = require('./webpack/config');

const { site, project } = getArg();

/**
 * 创建编译器函数
 * @param {*} webpackConfig
 */
const doCompiler = async webpackConfig => {
    const ProgressPlugin = require('webpack/lib/ProgressPlugin');
    const webpack = require('webpack');

    const compiler = webpack([webpackConfig]);
    // compiler.apply(new ProgressPlugin());
    return await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) throw reject(err);
            // process.stdout.write(stats.toString({
            //     colors: true,
            //     modules: false,
            //     children: false,
            //     chunks: false,
            //     chunkModules: false
            // }) + '\n\n')
            resolve(stats);
        })
    });
}

/**
 * 打包编译函数
 */
module.exports = async function builder(webpackConfig, processName = `${site} ${project}`) {
    // const spinner = ora(`building ${processName} ...`)
    // spinner.start()
    await doCompiler(webpackConfig);
    // spinner.stop()
    console.log(chalk.cyan(`Build ${processName} complete.\n`))
}
