const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')

const config = require('./config/config')
const router = require('./router')

// 开启服务器连接
mongoose.connect(config.database)
// 开启监听事件
mongoose.connection.on('connected', () => {
    console.log(`成功开启服务器:${config.database}`)
})

// 设置session配置文件
app.use(session({
    resave: false, // 重新保存
    saveUninitialized: true,
    secret: 'keyboard cat',//通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie: {maxAge: 1000 * 60 * 60 * 24}//失效时间
}))

// 设置静态文件
app.use(express.static(path.join(__dirname, '/public')))

// 设置模版引擎
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))

// 设置插件 解析请求体
app.use(bodyParser.urlencoded({extended: false}));

// 路由
router(app)

// assume 404 since no middleware responded
app.use(function (req, res, next) {
    res.status(404).render('404');
});

app.use(function (err, req, res, next) {
    console.log(err)
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500');
});

// config.serverURL,
app.listen(config.port, (err) => {
    if (err) return console.log(`err:${err}`)
    console.log(`server is running:${config.port}`)
})