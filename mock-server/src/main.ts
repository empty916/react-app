import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import isMockApi, {isMock, allIsMock} from './proxy/mock';
import config from './proxy/config';
import consoleStyle from './proxy/consoleStyle';
const proxy = require('http-proxy-middleware');

const commonProxy = proxy({
    target: config.devApiUrl,
    changeOrigin: true,
    autoRewrite: true,
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(config.baseUrl);
	app.use(config.baseUrl, (req, res, next) => {
        if (isMockApi(req.url)) {
            console.log(consoleStyle.inverse, 'mock接口:' + req.url);
            next();
        } else {
            commonProxy(req, res, next);
        }
    });
    setTimeout(() => {
        if (isMock) {
            if (allIsMock) {
                console.log(consoleStyle.cyan, `当前所有接口都在mock模式！`);
                console.log(consoleStyle.cyan, `当前所有接口都在mock模式！`);
                console.log(consoleStyle.cyan, `当前所有接口都在mock模式！`);
            } else {
                console.log(consoleStyle.blue, `当前部分接口在mock模式！`);
                console.log(consoleStyle.blue, `当前部分接口在mock模式！`);
                console.log(consoleStyle.blue, `当前部分接口在mock模式！`);
            }
        } else {
            console.log(consoleStyle.magenta, `当前不在mock模式！`);
            console.log(consoleStyle.magenta, `当前不在mock模式！`);
            console.log(consoleStyle.magenta, `当前不在mock模式！`);
        }
    }, 0)
    await app.listen(8089);
}

bootstrap();
