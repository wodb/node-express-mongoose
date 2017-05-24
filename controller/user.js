const {Router} = require('express')
const router = module.exports = Router()
const mongoose = require('mongoose')

router.prefix = '/userInfo'

// 定义模型
let blogSchema = new mongoose.Schema({
	name:{type:String},
	username:{type:String},
	password:{type:String},
	sex:{type:String},
	age:{type:String},
	detail:{ type: String, default: '不明信息' },
	telphone:{type:String},
	blog:{type:String}
})
// 第三个字段是表名字
let PersonModel = mongoose.model('person', blogSchema,'person');

router.get('/student',(req,res) => {
	// 查询方法
	PersonModel.find({},function (err,data) {
		if (err) return console.log(`ERR${err}`)
		console.log(data)
		res.render('user',{data:data})
	})
})