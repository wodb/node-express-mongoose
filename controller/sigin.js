const { Router } = require('express')
const co = require('co')

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
    const {username,password} = request.body
    const error = {
        message: ''
    }
    model.userModel.findOne({username})
            .exec(function (err, users) {
                console.log(err,users)
                if (err) {
                    error.message = '数据库出错'
                    response.send(error)
                    return
                }
                if (users && users.username == username) {
                    if (password == users.password) {
                        request.session.user = username
                        error.message = '成功'
                    }else {
                        error.message = '用户名或者密码不正确'
                    }
                } else {
                    error.message = '没有此用户'
                }
                response.send(error)
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
