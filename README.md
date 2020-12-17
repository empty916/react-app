
# react-app
react项目模板，支持typescript，react 16.10，router 5.1,


# 目录

- [运行项目](#run)
- [npm命令说明](#npm-script)
- [目录结构](#project-dir)
- [路径别名](#path-alias)
- [微模块架构](#micro-module-architecture)
- [路由](#router)
- [状态管理器](#state-manager)
- [create:module](#create-module)
- [mock](#mock)
- [icon](#icon)
- [theme，主题控制](#theme)
- [权限控制](#auth)
- [国际化](#i18n)
- [开源工具库](#os-utils)
- [本地工具库 src/utils](#local-utils)
- [UI框架使用规范](#ui-detail)

## <a id='run'>运行项目</a>

**node环境请升级到12+**

1. 安装vscode插件
	1. Debugger for Chrome
	1. EditorConfig for VS Code
	1. ESLint
	1. Prettier - Code formatter
	1. stylelint

1. 进入根目录
1. 运行命令，安装依赖
   1. 安装项目依赖
   ```node
   yarn 
   // 或者 npm i
   ```
   2. 安装mock服务依赖
   ```node
   // 进入mock-server目录
   cd ./mock-server
   yarn
   // 或者 npm i
   ```
2. 在根目录下，运行命令，编译项目依赖
   ```node
   yarn build:dll
   // 或者 npm run build:dll
   ```
3. 启动项目
   ```node
   yarn dev
   // 或者 npm run dev
   ```

## <a id='npm-script'>npm命令说明</a>

1. dev 开发
1. mock 启动mock服务，如果要链接后台，那么也应该启动此服务
1. build:dll 编译项目依赖包
1. build:dev 打包开发环境包
1. build:prd 打包生产环境包
1. create:module 模块创建脚本
2. cc mock服务的控制器创建脚本，建议如下使用
   ```node
    // 记得现在/mock-server下先安装好依赖
	npm run cc controller/xxx // 其中xxx是你的模块名
	// 比如
	npm run cc controller/dog
	// 即可在mock-server/src/controller文件夹下创建dog控制器，并自动注入完成。

   ```

## <a id='project-dir'>目录结构</a>


### 项目业务代码目录
- src 
	- APP 项目组件入口
	- assets 静态资源
	- components 公共组件
		- base 基础组件
		- bisiness 业务组件
	- constants 静态变量
	- http 请求服务封装
	- modules 所有页面及其业务逻辑
	- routes 路由相关
	- service 服务模块
    	- theme 原生主题控制服务
    	- app app服务
    	- i18n 国际化服务
    	- user 用户服务
	- store 全局状态，公共状态
	- theme 主题配置包，包含原生主题配置(在native文件夹下)和material主题配置包
	- utils 工具包

### mock服务目录
- mock-server 
  - src
    - proxy 代理配置
    - controller 控制器代码，主要写mock服务

### 项目打包配置及脚本
- scripts
  - auto-get-module 自动获取懒加载模块脚本
  - creat_module 自动创建模块脚本及模板
  - dll 存放dll包
  - webpack webpack配置
  - build_dll.js dll打包脚本
  - build.js 项目打包脚本
  - builder.js项目打包器
  - dev.js 启动本地开发环境脚本

## <a id='path-alias'>路径别名</a>

1. @ => src
1. @base => src/components/base
1. @biz => src/components/bussiness
1. @history => src/routes/history
1. @channel => buildConfig/channel/${channel}

## <a id='micro-module-architecture'>微模块架构</a>

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

## <a id='router'>路由</a>

1. 路由配置在src/routes中,
2. 应全部都使用懒加载
3. 二级子路由也应放在此处，方便整个项目路由的统一维护

## <a id='state-manager'>状态管理器</a>

1. 使用的是[natur](https://www.npmjs.com/package/natur)方案, 文档请看[natur](https://www.npmjs.com/package/natur)
2. 中间件配置
```typescript

// 中间件执行顺序，从上至下，按顺序执行
const store = createStore(
  modules,
  lazyModules,
  undefined,
  [
    thunkMiddleware, // action可以返回函数，接受getState，setState, getMaps, dispatch几个参数
    promiseMiddleware,// 支持异步操作
    fillObjectRestDataMiddleware, // 支持action增量更新state
    shallowEqualMiddleware, // 支持对象浅层比较优化
    devTool, // 支持redux devtool
    filterUndefinedMiddleware, // 不处理action返回的undefined结果
    localStorageMiddleware, // 缓存到localStorage中的中间件
  ],
);
```
3. 多个业务模块之间存在复杂交互场景，或者单个模块的业务逻辑较为复杂，使用[natur-service](https://www.npmjs.com/package/natur-service)方案

4. 数据持久化方案使用[natur-persist](https://www.npmjs.com/package/natur-persist)


## <a id='create-module'>create:module 创建模块脚本</a>

**建议使用此命令**

1. 创建模块脚本放在/scripts/create-module中
2. 模块的模板放在/scripts/create-module/templates中，可以自行添加自己需要的模板
3. 在模板中定义的template字符串，在模块自动生成后会自动替换为模块名
4. 例如用户新建aa-bb-cc/list模块，选择了base模板，那么base模板中的所有template字符串都会被替换为aaBbCcList字符



## <a id='mock'>mock</a>

**mock服务器不仅仅是mock数据，还是真正的后台接口转发器，所以不论是否需要mock数据，你都应该将它开启，mockjs已经在依赖里面，结合使用更香**

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


## <a id='icon'>icon</a>
**[icon库查看](https://material-ui.com/zh/components/material-icons/)**

1. 方式一 要将官网查到的icon的驼峰命名法改为'_'分隔符命名
   
   ```typescript
   import { Icon } from '@material-ui/core';

   <Icon>airline_seat_flat</Icon>
   ```

2. 方式二
   ```typescript
   import AirlineSeatFlat from '@material-ui/icons/AirlineSeatFlat';

   <AirlineSeatFlat />
   ```

## <a id='theme'>theme，主题控制</a>

1. 基本上项目的主题都可以通过material的主题方案控制，放在/src/theme/material.ts
1. 需要原声控制的主题样式都放在theme文件夹下，然后引入到App/index.js中
2. 使用/service/theme.ts控制主题切换
	1. 创建样式文件, 定义样式变量
	```scss
	/* src/theme/native/theme.scss */
	.btn {
      border-radius: borderRadius; // 随便定义一个变量
	}
	```
	2. 给予自定义样式变量初始值
	```typescript
	// src/theme/native/config.ts
	export default {
      // ...其他变量
      // 你的变量
      borderRadius: '2px',
	}
	```
	3. 使用样式
	```typescript
	// 使用theme的样式，和普通样式相同，
	import style from '@/theme/native/theme.scss'

	// style.btn,使用此样式即可
	```

	3. 动态改变样式
	```typescript
	import theme from '@/service/theme';
	theme.set('borderRadius', '0px');
	```

## <a id='auth'>权限控制</a>

1. 权限控制使用HOC实现，具体代码参考@biz/AuthFilterHOC.tsx
   ```typescript
   // 权限判断的逻辑在/src/store/user.store.ts中
   // 支持单个权限、权限等级、角色权限三种控制方式
   import Button from '@material-ui/core';
   import AuthFilterHOC from '@biz/AuthFilterHOC';

   const AuthButton = AuthFilterHOC(Button);

   <AuthButton auth='login' authLevel={1} authRole='admin' />
   ```

## <a id='i18n'>国际化</a>

1. 在@/service/i18n.ts中，有两个方法，一个是t函数，一个是useI18n方法，区别是useI18n可以监听语言配置的变化，自动刷新组件。
2. 语言包的定义都在@/constants/lang中

```typescript

import React from 'react';
import {t, useI18n} from '@/service/i18n';

t('hello') // 你好 ｜ hello

const Comp: React.FC = () => {
  const $t = useI18n();
  return $t('hello');
}

```


## <a id='os-utils'>开源工具库</a>

1. 基础工具函数[lodash](https://www.npmjs.com/package/lodash)
2. 表单校验[formik](https://www.npmjs.com/package/formik)
3. url工具[qs](https://www.npmjs.com/package/qs)
3. 对象key值转换工具[convert-key](https://www.npmjs.com/package/convert-key)
4. 计算库[decimal.js](https://www.npmjs.com/package/decimal.js)
5. 时间处理库[dayjs](https://www.npmjs.com/package/dayjs)
6. 颜色处理库[color](https://www.npmjs.com/package/color)
7. [d3](https://www.npmjs.com/package/d3)
8. [rxjs](https://www.npmjs.com/package/rxjs)

## <a id='local-utils'>本地工具库 src/utils</a>

1. hooks.ts，其中含有常用的hooks方法
1. regExps.ts 存放常用的正则
1. validator.ts 存放数据校验函数工具


## <a id='ui-detail'>UI框架使用规范</a>

1. 本项目使用[material ui](https://material-ui.com/zh/getting-started/usage/)作为主要的UI框架
2. 在使用[material ui](https://material-ui.com/zh/getting-started/usage/)中的组件时，需要在/business/base中引入并导出，这么做的目的是隔离三方组件，以防业务需求，可以做二次封装
3. 在本项目中无法直接使用自定义的组件导入，这是由于typescript无法配置自定义的依赖路径导致
	```javascript
	// 错误， typescript报错
	import Button from 'Button'
	// 正确
	import Button from '@base/Button'

	```
