const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const consoleStyle = require('./consoleStyle');
const app = express();
const config = require('./config');
const urlList = require('./mock');
const router = express.Router();

const {
	port,
	baseUrl,
	devApiUrl,
} = config;

const commonProxy = proxy({
    target: devApiUrl,
    changeOrigin: true,
    autoRewrite: true
});
const mockProxy = proxy({
    target: 'http://localhost:7001',
    changeOrigin: true,
});

/*
请求处理接口
处理代理、多个代理
*/
router.use('/', function(req, res, next) {
    if(urlList(req.url)){
        console.log(consoleStyle.inverse, 'mock接口:' + req.url)
        mockProxy(req, res, next);
    } else {
        commonProxy(req, res, next);
    }
});

app.use(baseUrl, router);


app.listen(port, () => {
    console.log(consoleStyle.green, '代理服务器已启动');
    if (urlList.isMock) {
        console.log(consoleStyle.blue, `当前在mock模式！`);
    } else {
        console.log(consoleStyle.magenta, `当前不在mock模式！`);
    }
    // console.log(consoleStyle.green, `cmd+单击链接(http://localhost:${port}), 打开页面`);
});
