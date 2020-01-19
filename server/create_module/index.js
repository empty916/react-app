const CvScript = require('cv-script').default;
const path = require('path');
const { fileDataMap, moduleNameQuestion } = require('cv-script/dist/utils');

// 模板地址
const templatePath = path.join(__dirname, 'templates');
const distPath = path.join(__dirname, '..', '..', 'src', 'modules');


const cvs = new CvScript({
	// questions: [moduleNameQuestion],
	templateDirPath: templatePath,
	// templateFilePath: templatePath,
	distPath: distPath,
	fileDataMaps: [fileDataMap],
});

cvs.start();
