# react-project-template
react项目模板，支持typescript，react 16.8，router 5.0,

## npm命令说明

1. dev 开发
1. mock 启动mock服务
1. build:dll 编译项目依赖包
1. build:dev 打包开发环境包
1. build:prd 打包生产环境包
1. create:module 模块创建脚本


## 微模块架构

1. 一个模块包括**业务逻辑、UI、后台交互**等，这些组成一个模块，存放在一个文件夹中
2. 所有的模块都放在src/modules下，可以包含多层级
3. 模块下所有的index文件都会被脚本自动匹配到，会自动导入到状态管理器中
4. 例如你新建了一个模块名为aa-bb-cc/list, 脚本生产会将此名字转为驼峰命名，aaBbCcList, 组件和状态管理模块都叫这个名字
5. 关于业务逻辑、UI代码都可以放在同一个文件夹下，但是后台交互的service需要写在跟模块的文件夹下
```typescript
// 例如
// 现在有用户管理模块 /modules/user
// 其下有
// 用户列表 /modules/user/list
// 用户详情 /modules/user/detail
// 用户新增 /modules/user/create
// 用户修改 /modules/user/update
// 等子模块
// 那么关于用户的所有service都应该放在/modules/user/sercive.ts中维护
// 而不是在每个子模块中都新建service.ts项去单独维护
```

## 路由

1. 路由配置在src/routes中,
2. 应全部都使用懒加载
3. 二级子路由也应放在此处，方便整个项目路由的统一维护

## 状态管理器

1. 使用的是[rns-pure](https://www.npmjs.com/package/rns-pure) 
2. 中间件配置
```typescript

// 中间件执行顺序，从上至下，按顺序执行
const store = createStore(
	modules,
	lazyModules as any,
	undefined,
	[
		thunkMiddleware, // action可以返回函数，接受getState，next两个参数
		promiseMiddleware,// 支持异步操作
		shallowEqualMiddleware, // 支持对象浅层比较优化
		devTool, // 支持redux devtool
		filterUndefinedMiddleware, // 不处理action返回的undefined结果
	],
);
```

3. thunkMiddleware, action可以返回函数
```typescript

const action = () => (getState, next) => {
  getState() // 获取最新的state
  next(newState) // 设置state， state支持过滤undefined、promise、async、浅层对比优化
};
```


4. promiseMiddleware，action支持异步操作
```typescript

// promiseMiddleware
const action1 = () => Promise.resolve(2333);
const action2 = async () => await new Promise(res => res(2333));

```

5. devTool, shallowEqualMiddleware
```typescript

// devTool 浏览器安装redux插件，即可看到数据变动记录，无法回滚数据

// shallowEqualMiddleware 浅层比较优化,仅限于普通对象{}
const state = {a: 1, b:2};
const action = () => ({a: 1, b:2}) // 于state相同，不做视图刷新

```

6. filterUndefinedMiddleware
```typescript

// filterUndefinedMiddleware
const action = () => undefined; // 这种action的返回不会作为新的state
```


## create:module 创建模块脚本

**建议使用此命令**

1. 创建模块脚本放在/server/create_module中
2. 模块的模板放在/server/create_module/templates中，可以自行添加自己需要的模板
3. 在模板中定义的template字符串，在模块自动生成后会自动替换为模块名
4. 例如用户新建aa-bb-cc/list模块，选择了base模板，那么base模板中的所有template字符串都会被替换为aaBbCcList字符



## mock

1. mock服务器使用的是nestjs框架，需要先安装依赖才能运行
	```typescript
	cd ./mock-server
	yarn // 或者npm i
	```
2. mock服务器，设计是部分接口可以mock，部分接口走正常后台，具体配置在**mock-server/src/proxy/** 下
3. mock-server/src/proxy/api/*表示，你编写的mock api列表
4. mock-server/src/proxy/mock.ts配置你需要哪些API需要mock，以及mock总开关
5. mock-server/src/proxy/config.ts配置mock服务的请求url前缀、不走mock时的服务器地址
6. mock接口写在mock-server/src/controller中，可以结合mockjs 模拟假数据
7. 写好controller需要将controller手动引入到mock-server/src/app.module.ts中


## theme，主题控制

1. 所有的主题样式都放在theme文件夹下，然后引入到App/index.js中
2. 使用business/theme/index.js控制主题切换
	1. 创建样式文件, 定义样式变量
	```scss
	/* src/theme/demo.scss */
	.btn {
		border-radius: borderRadius; // 随便定义一个变量
	}
	```
	2. 给予自定义样式变量初始值
	```typescript
	// theme/config.ts
	export default {
		// ...其他变量
		// 你的变量
		borderRadius: '2px',
	}
	```
	3. 使用样式
	```typescript
	// 使用theme的样式，和普通样式相同，
	import style from '@client/theme/demo.scss'

	// style.btn,使用此样式即可
	```

	3. 动态改变样式
	```typescript
	import theme from '@client/business/theme';
	theme.set('borderRadius', '0px');
	```

## 权限控制

1. 权限控制使用HOC实现，具体代码参考business/Authority.js


## 工具库 src/utils

1. 主要的request请求都放在request中，包括普通请求，文件下载之类的前后端对接模块
2. hooks.ts，其中含有常用的hooks方法
3. convertKeys.ts, 作用是转化key的名称

	```typescript
	import convertKey from '@utils/convertKey'

	const keyMaps = {
		pdName: 'productName',
		uName: 'userName',
	}
	type KeyMaps = {
		pdName: 'productName',
		uName: 'userName',
	}

	const convertDataKey = convertKey<KeyMaps>(keyMaps);

	const myData = convertDataKey({
		pdName: '余额宝',
		uName: 'tom',
	});

	/**
	 * myData: {
	 *  productName: '余额宝',
	 *  userName: 'tom',
	 * }
	 * 
	*/

	// 如果想要转换回去，可以使用
	const theirData = convertDataKey.revert(myData);

	/**
	 * theirData: {
	 *  pdName: '余额宝',
	 *  uName: 'tom',
	 * }
	 * 
	*/

	```