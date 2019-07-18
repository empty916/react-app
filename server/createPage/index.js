// const path = require('path');
const Check = require('./util/Check');
const Create = require('./util/Create');
// const ReadFile = require('./util/ReadFile');
const Interactive = require('./util/Interactive');
const { createFileNameQuestion } = require('./config');

// fileName == pageName
const start = async () => {
	const fileName = await Interactive.getUserInput(createFileNameQuestion);

	console.log('检查文件名...\n');
	const fileNameIsValid = Check.nameIsValid(fileName);

	if (!fileNameIsValid) {
		console.log('请重新输入\n');
		start();
		return false;
	}

	const templateType = await Interactive.getTemplate();

	const create = new Create(fileName, templateType);

	console.log('开始创建文件...\n');
	create.createFiles();
	console.log('创建文件成功!\n');
	// console.log('开始链接redux数据\n');
	// create.createReduxLink();
	// console.log('redux数据链接成功！\n');
	// console.log('开始导入到路由配置中...\n');
	// create.createRouteLink();
	// console.log('页面路由设置完成！\n');

	console.log('模块创建成功！！！\n');
};

start();
