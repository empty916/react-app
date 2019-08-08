// 替换工具类
class Replace {

    // 将templateData中的template字符全部替换成replaceStr
    replaceTemplateData(tempData, replaceStr) {
        const capitalizedReplaceStr = this.getCapitalizedStr(replaceStr);
        return tempData.replace(/template/g, replaceStr)
            .replace(/TEMPLATE/g, replaceStr.toUpperCase())
            .replace(/Template/g, capitalizedReplaceStr)
    }
    // 获取首字母大写的字符串
    getCapitalizedStr(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
}

module.exports = new Replace();