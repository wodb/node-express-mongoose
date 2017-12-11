const { Router } = require('express')
// const co = require('co')

// 引入模型
const UserModel = require('../modules/index')

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
router.post('/sigin', (req, res, next) => {
    const {username,password} = req.body

    UserModel.getUserName(username)
    .then((user) => {
        if (!user) {
            res.send({code:101,message:'没有此用户'})
        }
        if (user.password == password) {
            req.session.user = user
            res.send({code:100,message:'登陆成功'})
        }else {
            res.send({code:101,message:'用户名或密码不正确'})
        }
    })
})
/**
 * get 注册页面
 */
router.get('/register', (req, res) => {
    res.render('register')
})
/**
 * post 注册
 */
router.post('/register', (req, res) => {
    let reqData = req.body
    for(var k in reqData) {
        if(!reqData[k]) {
           return res.json({success: false, message: '请输入您的账号密码!'});
        }
    }
    let registerInfo = new model.userModel(reqData)
    registerInfo.save((err) => {
        if (err) return res.json({success: false, message: '注册失败!'})
        res.json({success: true, message: '注册成功!'})
    })
})
