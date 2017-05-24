const { Router } = require('express')

// 引入模型
const model = require('../modules/index')

const router = module.exports = Router()
router.prefix = '/api'

/**
	* get 登陆页面
	*/
router.get('/sigin', (req, res) => {
  res.render('sigin')
})
/**
	* psot 开始登陆
	*/
router.post('/sigin', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  const error = {
  	message:''
  }
  model.userModel.findOne({username})
  .exec(function (err,users) {
  	if (err) {
  		error.message = '数据库出错'
  		response.send(error)
  		return
  	} 
		if (users.username == username) {
			error.message = '成功'
		} else {
			error.message = '没有此用户'
		}
		response.send(error)
  })
})
/**
	* get 注册页面
	*/
router.get('/register',(req,res) => {
	res.render('register')
})
/**
	* post 注册
	*/
router.post('/register',(req,res) => {
	let reqData = req.body
	let resMes = {message:''}
	let registerInfo = new model.userModel({
		username:reqData.username,
		password:reqData.password,
		sex:reqData.sex,
		age:reqData.age,
		address:reqData.address
	})
	model.userModel.findOne({username:reqData.username})
	.exec((err,findInfo) => {
		if (findInfo) {
			return res.send({message:'此用户已存在'})
		}
	})
	registerInfo.save((err,info) => {
		if (err) return res.status(500).send({message:'服务器失败'})
		res.send({message:'成功',data:info})
	})
})