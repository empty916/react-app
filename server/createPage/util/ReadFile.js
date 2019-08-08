const fs = require('fs');
const path = require('path');

const pathRes = (fileName, tempType = 'template') => {
    return path.resolve(__dirname, `../templates/${tempType}`, fileName);
};

const types = {
    'actions.ts': pathRes('actions.ts'),
    'constants.ts': pathRes('constants.ts'),
    'index.ts': pathRes('index.ts'),
    'reducer.ts': pathRes('reducer.ts'),
    'style.scss': pathRes('style.scss'),
    'mock.ts': pathRes('mock.ts'),
};

class ReadFile {
    readTemplate(type = 'actions.ts', tempType) {
        let templateFilePath;
        if(!!tempType){
            templateFilePath = pathRes(type, tempType);
        } else {
            templateFilePath = types[type];
        }

        if(!templateFilePath) {
            return 'no such template';
		}
		const templateFileIsExist = fs.existsSync(templateFilePath);
		if (!templateFileIsExist) {
			return null;
		}
        const fileData=fs.readFileSync(templateFilePath,"utf-8");
        return fileData;
    }
    readFile(path){
        return fs.readFileSync(path,"utf-8");
    }
    readDir(path){
        return fs.readdirSync(path, 'utf8');
    }
}

module.exports = new ReadFile();
