const readline = require('readline');
const path = require('path');
const ReadFile = require('./ReadFile');

/**
 * 交互类
 * 处理用户在控制台的交互
 */
class Interactive {
	/**
	 * 从控制台读取用户输入的信息
	 * @param question 用户输入的问题|提示
	 * @returns {Promise}
	 */
	getUserInput(question) {
		return new Promise((resolve, reject) => {
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question(question, answer => {
				resolve(answer);
				rl.close();
			});
		});
	}

	async getTemplate() {
		const tmplDirs = ReadFile.readDir(
			path.join(__dirname, '../', 'templates')
		);
		if (tmplDirs.length === 1) {
			return tmplDirs[0];
		} 
			let question = '发现存在以下多个模板:\n\n';
			tmplDirs.forEach((tmplName, index) => {
				question += `${index}: ${tmplName}\n`;
			});
			question += '\n你的模块想要根据哪个模板来创建?(选择序号即可！):\n';
			let index = await this.getUserInput(question);
			index = parseInt(index);
			if (!tmplDirs[index]) {
				// console.log('不存在该序号！');
				throw '不存在该序号！';
			}
			return tmplDirs[index];
		
	}
}

module.exports = new Interactive();
