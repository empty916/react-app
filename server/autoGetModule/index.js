const path = require("path");
const matchLazyModule = require('match-lazy-module');

const project = "src";
const slash = "/";
const projectPath = path
	.join(__dirname, "..", "..", project)
	.replace(/\\|\//g, slash);
const moduleDirName = "modules";
const moduleBasePath = path.join(__dirname, "..", "..", project, moduleDirName);
const matchFileName = "index";

const importPathPrefix = "@";
const fileName = path.join(__dirname, '..', '..', 'src', 'store', "lazyModule.ts");


const generateLazyModule = matchLazyModule({
    projectPath,
    moduleBasePath,
    moduleDirName,
	matchFileName,
    importPathPrefix,
    fileName
});

module.exports = generateLazyModule;
