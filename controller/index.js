const {Router} = require('express')
const router = module.exports = Router()
router.prefix = '/api'

// 设计路由
router.get('/sigin',(req,res) => {
	res.render('index')
})
router.post('/sigin',(req,res) => {
	console.log(req.body)
	res.send('111')
})