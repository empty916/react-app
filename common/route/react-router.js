import * as reactRouter from 'react-router';

// 在这里切换路由种类就可以切换整个项目的路由
// 前提是，项目中的路由都得用这个文件导出的路由
// const history = reactRouter.browserHistory;
const history = reactRouter.hashHistory;

export default { ...reactRouter, history };