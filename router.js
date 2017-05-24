const glob = require('glob')

module.exports = (app) => {
	// 使用同步方式进行读取文件
	const files = glob.sync('./controller/*.js')

	files.forEach((f) => {
		const file = require(f)
		app.use(file.prefix,file)
	})
}