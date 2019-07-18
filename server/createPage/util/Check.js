const fs = require('fs');
const path = require('path');
const { pagesPath, ReservedFileName } = require('../config');

class Check {
    nameIsValid(fileName){
        const templateNameIsPermit = this._nameIsPermit(fileName);
        const fileIsExist = this._nameIsExist(fileName);
        const fileIsReserved = this._nameIsReserved(fileName);

        if(!templateNameIsPermit){
            console.error('模块名称只能是字母，建议是驼峰命名法');
            console.log('请重新输入\n');
            return false;
        }
        if(fileIsExist){
            console.error('\n该名称文件已经存在，请选择其他名字');
            console.log('请重新输入\n');
            return false;
        }
        if(fileIsReserved){
            const reservedFileNames = ReservedFileName.join('、');
            console.error('\n该文件名是保留字段，请选择其他名字');
            console.error(`保留文件名有${reservedFileNames}`);
            console.log('请重新输入\n');
            return false;
        }
        return true;
    }

    // 检查文件名是否合规
    _nameIsPermit(fileName){
        let reg = /^[a-z\/]{0,}$/i;
        return reg.test(fileName) && !!fileName;
    }
    // 检查文件是否已经存在
    _nameIsExist(fileName) {
        const pagePath = path.resolve(__dirname, `../${pagesPath}`, fileName);
        const isExist = fs.existsSync(pagePath);
        return isExist;
    }
    // 检查文件名是否是保留字段
    _nameIsReserved(fileName){
        return ReservedFileName.indexOf(fileName) > -1;
    }
}

module.exports = new Check();
